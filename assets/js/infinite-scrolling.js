/* global HTMLElement, customElements, FormData, fetch, IntersectionObserver  */

const fetchThings = async (form, target, step) => {
  const data = new FormData(form)
  const url = new URL(form.getAttribute('action'), window.location.origin)

  const currentQuery = new URLSearchParams(window.location.search)
  const from = (currentQuery.get('from') ? parseInt(currentQuery.get('from')) : 0) + step
  // load only the content we need
  url.searchParams.set('snippet', true)
  url.searchParams.set('from', from)

  // // delete pagination infos for new filter settings
  // url.searchParams.delete('from')

  for (const [key, value] of data) {
    url.searchParams.append(key, value)
  }

  await fetch(url.toString())
    .then(async res => {
      if (!res.ok) {
        console.log('error', res)
      }
      const text = await res.text()
      target.innerHTML = target.innerHTML + text

      url.searchParams.delete('snippet')
      window.history.pushState({ }, '', url.toString())
    })
}

class InfiniteScrolling extends HTMLElement {
  connectedCallback () {
    this.form = this.querySelector('form')
    this.target = document.querySelector(this.getAttribute('target'))
    this.step = this.getAttribute('step') ? parseInt(this.getAttribute('step')) : 25
    this.scrollTarget = document.querySelector('footer')

    this.scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await fetchThings(this.form, this.target, this.step)
        }
      })
    })

    this.scrollObserver.observe(this.scrollTarget)
  }

  disconnectedCallback () {
    this.scrollObserver.unobserve(this.scrollTarget)
  }
}

customElements.define('infinite-scrolling', InfiniteScrolling)
