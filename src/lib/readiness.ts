// Tracks the critical assets the preloader waits for. The hero video reports
// in from its own component, so it may be ready before the preloader listens.
type Listener = () => void

let videoSettled = false
const listeners = new Set<Listener>()

export function markVideoSettled() {
  if (videoSettled) return
  videoSettled = true
  listeners.forEach((fn) => fn())
}

export function onVideoSettled(fn: Listener): () => void {
  if (videoSettled) {
    fn()
    return () => {}
  }
  listeners.add(fn)
  return () => listeners.delete(fn)
}
