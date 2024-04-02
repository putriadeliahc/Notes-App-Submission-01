class AsideComponent extends HTMLElement {
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
        .kontak {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
          }
          
          .kontak h2 {
            font-size: 24px;
            margin-top: 0;
          }
          
          .kontak p {
            margin-bottom: 10px;
          }
        </style>
        <aside class="kontak">
        <h2>Informasi Kontak jika mengalami error :</h2>
        <p>Nama : Putri Adelia Kahirunnisa<p>
        <p>Instagram : @_adelianisa_</p>
        <p>Telepon: 085791xxx</p>
        <p>Email: putriadeliakhairunnisa@gmail.com</p>
      </aside>
      `;
    }
}

customElements.define('aside-section', AsideComponent);
