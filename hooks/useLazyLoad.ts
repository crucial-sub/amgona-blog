const useLazyLoad = (lazyImages: NodeListOf<HTMLImageElement> | null) => {
  if (!lazyImages) return

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
    threshold: 0.05,
  })

  lazyImages.forEach((img, index) => {
    if (index < 2 && img.dataset.src) {
      img.src = img.dataset.src
    } else {
      io.observe(img)
    }
  })
}

export default useLazyLoad
