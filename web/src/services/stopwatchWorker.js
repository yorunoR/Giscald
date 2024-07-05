self.addEventListener('message', (_e) => {
  let elapsedTime = 0
  const _intervalId = setInterval(() => {
    elapsedTime++
    self.postMessage({ elapsedTime })
  }, 1000)
})
