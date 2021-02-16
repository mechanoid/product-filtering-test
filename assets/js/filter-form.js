/* global HTMLElement, customElements, FormData, fetch, window */

class FilterForm extends HTMLElement {
  async connectedCallback () {
    this.form = this.querySelector('form')
    this.filterList = document.querySelector(this.getAttribute('filters'))

    this.addEventListener('change', async e => {
      const data = new FormData(this.form)

      const url = new URL(this.form.getAttribute('action'), window.location.origin)

      // load only the content we need
      url.searchParams.set('snippet', true)

      // delete pagination infos for new filter settings
      url.searchParams.delete('from')
      url.searchParams.delete('limit')

      for (const [key, value] of data) {
        url.searchParams.append(key, value)
      }

      await fetch(url.toString())
        .then(async res => {
          if (!res.ok) {
            console.log('error', res)
          }
          const text = await res.text()
          this.filterList.innerHTML = text

          url.searchParams.delete('snippet')
          window.history.pushState({ }, '', url.toString())
        })
    })
  }
}

customElements.define('filter-form', FilterForm)
