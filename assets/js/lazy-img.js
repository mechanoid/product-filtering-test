/* global HTMLImageElement, customElements, IntersectionObserver */

const imageObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const image = entry.target
      image.src = image.dataset.src
      image.classList.remove('lazy')
      imageObserver.unobserve(image)
    }
  })
})

class LazyImg extends HTMLImageElement {
  connectedCallback () {
    imageObserver.observe(this)
  }
}

customElements.define('lazy-img', LazyImg, { extends: 'img' })
