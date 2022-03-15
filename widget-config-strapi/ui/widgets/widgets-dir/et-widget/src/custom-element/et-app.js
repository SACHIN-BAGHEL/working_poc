import ReactDOM from "react-dom"
import React from "react"
import App from '../App'



const ATTRIBUTES = {
    name: 'name',
    nameTwo: 'nameTwo',
};

class WidgetElement extends HTMLElement {

    static get observedAttributes() {
        return Object.values(ATTRIBUTES);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!Object.values(ATTRIBUTES).includes(name)) {
            throw new Error(`Untracked changed attribute: ${name}`);
        }
        if (this.mountPoint && newValue !== oldValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        this.render();
    }

    render() {
        const name = this.getAttribute(ATTRIBUTES.name);
        const nameTwo = this.getAttribute(ATTRIBUTES.nameTwo);
        ReactDOM.render(<App name={name} nameTwo={nameTwo}/>, this.mountPoint);
    }
}

customElements.define('my-widget', WidgetElement);

export default WidgetElement;

