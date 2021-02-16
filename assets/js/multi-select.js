/* global HTMLElement, customElements */

class MultiSelect extends HTMLElement {
  connectedCallback () {
    this.toggleButton = this.querySelector('button')
    this.multiSelectOptions = this.querySelector('multi-select-options')

    this.toggleButton.addEventListener('click', e => {
      e.preventDefault()
      const expanded = this.toggleButton.hasAttribute('aria-expanded')
      this.toggleButton.toggleAttribute('aria-expanded')
      this.multiSelectOptions.hidden = !expanded
      this.multiSelectOptions.style.border = '1px solid red'
    })
  }
}

customElements.define('multi-select', MultiSelect)
