// Rebuilds the hero media from the original green-screen walking video:
//   public/media/shairy-walk-alpha.webm  transparent VP9 (Chrome, Edge, Firefox)
//   public/media/shairy-still.png        transparent still for reduced motion
//   src/walkTrack.json                   her horizontal centre per frame
// Usage: node scripts/build-hero-media.mjs "path/to/original-video.mp4"
// Needs ffmpeg on PATH, or `npm i --no-save ffmpeg-static`.
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const src = process.argv[2]
if (!src) throw new Error('Pass the path to the original video')

let ffmpeg = 'ffmpeg'
try {
  ffmpeg = createRequire(import.meta.url)('ffmpeg-static') || ffmpeg
} catch {}

const W = 1280
const H = 720
const LO = 6
const HI = 24 // green dominance thresholds for the key

const run = (args, opts) => spawn(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: ['pipe', 'pipe', 'inherit'], ...opts })

const dec = run(['-i', src, '-vf', `scale=${W}:${H}`, '-r', '24', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])
const enc = run([
  '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${H}`, '-r', '24', '-i', '-',
  '-i', src, '-map', '0:v', '-map', '1:a?',
  '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '32', '-row-mt', '1',
  '-deadline', 'good', '-cpu-used', '2', '-auto-alt-ref', '0', '-c:a', 'libopus', '-b:a', '64k',
  'public/media/shairy-walk-alpha.webm',
])

const frameSize = W * H * 3
const track = []
let pending = Buffer.alloc(0)

function processFrame(f) {
  const out = Buffer.alloc(W * H * 4)
  const cols = new Float64Array(W)
  for (let i = 0, j = 0, p = 0; i < f.length; i += 3, j += 4, p++) {
    const r = f[i], g = f[i + 1], b = f[i + 2]
    const m = Math.max(r, b)
    const a = 1 - Math.min(1, Math.max(0, (g - m - LO) / (HI - LO)))
    out[j] = r
    out[j + 1] = Math.min(g, Math.round(m * 1.02))
    out[j + 2] = b
    out[j + 3] = Math.round(a * 255)
    if (a > 0.5) cols[p % W]++
  }
  let sum = 0, wsum = 0
  for (let x = 0; x < W; x++) { sum += cols[x]; wsum += cols[x] * x }
  track.push(sum < 500 ? null : Math.round((wsum / sum / W) * 1e4) / 1e4)
  return out
}

dec.stdout.on('data', async (chunk) => {
  pending = Buffer.concat([pending, chunk])
  while (pending.length >= frameSize) {
    const frame = pending.subarray(0, frameSize)
    pending = pending.subarray(frameSize)
    if (!enc.stdin.write(processFrame(frame))) {
      dec.stdout.pause()
      enc.stdin.once('drain', () => dec.stdout.resume())
    }
  }
})
dec.on('close', () => enc.stdin.end())
enc.on('close', (code) => {
  if (code !== 0) throw new Error('ffmpeg encode failed')
  writeFileSync('src/walkTrack.json', JSON.stringify(track))
  const still = spawn(ffmpeg, ['-v', 'error', '-y', '-c:v', 'libvpx-vp9', '-ss', '6', '-i', 'public/media/shairy-walk-alpha.webm',
    '-frames:v', '1', '-pix_fmt', 'rgba', 'public/media/shairy-still.png'], { stdio: 'inherit' })
  still.on('close', (c) => console.log(c === 0 ? `Done: ${track.length} frames tracked` : 'Still frame failed'))
})
