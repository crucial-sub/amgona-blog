const useLazyLoad = () => {
  if (typeof document === 'undefined') return

  const lazyImages: NodeListOf<HTMLImageElement> =
    document.querySelectorAll('.lazyImage')

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return

      const image = target as HTMLImageElement
      const { src: imageUrl } = image.dataset

      if (imageUrl) {
        image.src = imageUrl
        observer.unobserve(image)
      }
    })
  }

  const io = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
  })

  lazyImages.forEach(img => io.observe(img))
}

export default useLazyLoad
