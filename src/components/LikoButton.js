class LikoButton extends HTMLElement {
  static get observedAttributes() {
    return ['primary', 'size', 'label', 'background-color'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const primary = this.hasAttribute('primary');
    const backgroundColor = this.getAttribute('background-color');
    const size = this.getAttribute('size') || 'medium';
    const label = this.getAttribute('label');

    const baseClasses = 'font-nunito-sans font-bold border-0 rounded-3xl cursor-pointer inline-block leading-none';

    let sizeClasses = '';
    switch(size) {
      case 'small':
        sizeClasses = 'text-xs px-4 py-2.5';
        break;
      case 'large':
        sizeClasses = 'text-base px-6 py-3';
        break;
      default: // medium
        sizeClasses = 'text-sm px-5 py-2.5';
        sizeClasses = 'text-sm px-5 py-[11px]';
    }

    const modeClasses = primary
      ? 'text-white bg-[#555ab9]'
      : 'text-[#333] bg-transparent shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset]';

    this.innerHTML = '';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `${baseClasses} ${sizeClasses} ${modeClasses}`;
    btn.innerText = label;
    if (backgroundColor) {
      btn.style.backgroundColor = backgroundColor;
    }

    this.appendChild(btn);
  }
}

if (!customElements.get('liko-button')) {
  customElements.define('liko-button', LikoButton);
}

export const LikoButtonExport = ({ primary, backgroundColor = null, size, label, onClick }) => {
  const btn = document.createElement('liko-button');
  if (primary) btn.setAttribute('primary', '');
  if (backgroundColor) btn.setAttribute('background-color', backgroundColor);
  if (size) btn.setAttribute('size', size);
  if (label) btn.setAttribute('label', label);
  if (onClick) {
    btn.addEventListener('click', onClick);
  }
  return btn;
};
