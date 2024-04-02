class JbtrComponent extends HTMLElement {
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
        .jumbotron {
            background-color: #ffffff;
            color: #333;
            text-align: center;
            padding: 100px 0;
          }
          
          .jumbotron h1 {
            font-size: 36px;
          }
          
          .jumbotron p {
            font-size: 18px;
          }#ddd;
        }
        </style>
        <div class="jumbotron">
        <h1>Yuk, Mulai Buat Catatan Keseharianmu!</h1>
        <p>Kamu bisa menulis catatan penting hari-harimu Dibawah ini </p>
      </div>
      `;
    }
}

customElements.define('jbtr-section', JbtrComponent);
