class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Membuka Shadow DOM
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        /* Style untuk footer */
        footer {
          background-color: #9147f1;
          color: white;
          text-align: center;
          padding: 10px 0;
        }
      </style>
      <footer>
        <h3>created by nisa</h3>
      </footer>
    `;
    }
}

customElements.define('footer-component', FooterComponent);
