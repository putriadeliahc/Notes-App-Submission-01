class NavbarComponent extends HTMLElement {
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
      .navbar {
        background-color: #4c78af;
        padding: 10px;
      }
      
      .navbar ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      
      .navbar li {
        display: inline;
      }
      
      .navbar a {
        color: white;
        text-decoration: none;
        margin-right: 20px;
      }
      
      .navbar a:hover {
        color: #ddd;
      }
      </style>
      <header>
      <nav class="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#Cari">Cari</a></li>
          <li><a href="#kotakCatatan">Catatan Anda</a></li>
          <li><a href="#kotakCatatanArsip">Arsip</a></li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define('navbar-section', NavbarComponent);
