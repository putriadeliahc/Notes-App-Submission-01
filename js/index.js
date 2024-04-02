import dataCatatan from './data.js';
import '../../components/footer.js'
import '../../components/navbar.js'
import '../../components/jumbotron.js'
import '../../components/aside.js'


function menampilkanCatatan() {
  const kotakCatatankonten = document.getElementById('kotakCatatan');
  const kotakCatatanArsipkonten = document.getElementById('kotakCatatanArsip');

  kotakCatatankonten.innerHTML = '';
  kotakCatatanArsipkonten.innerHTML = '';

  dataCatatan.forEach(note => {

    const card = document.createElement('div');
    card.classList.add('card');

    const elemenJudul = document.createElement('h2');
    elemenJudul.textContent = note.title;

    const elemenBody = document.createElement('p');
    elemenBody.textContent = note.body;

    const buttonkonten = document.createElement('div');
    buttonkonten.classList.add('button-konten');

    const buttonedit = document.createElement('button');
    buttonedit.classList.add('button-edit');
    buttonedit.addEventListener('click', function () {
      menampilkanPopUpEditCatatan(note.id, note.title, note.body);
    });

    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa', 'fa-edit');
    buttonedit.appendChild(iconEdit);
    buttonedit.insertAdjacentText('beforeend', ' Edit Data');
    buttonkonten.appendChild(buttonedit);

    const buttonhapus = document.createElement('button');
    buttonhapus.classList.add('button-hapus');
    buttonhapus.addEventListener('click', function () {
      hapusCatatanId(note.id);
      alert('Catatan berhasil dihapus.');
    });

    const iconHapus = document.createElement('i');
    iconHapus.classList.add('fa', 'fa-trash');
    buttonhapus.appendChild(iconHapus);
    buttonhapus.insertAdjacentText('beforeend', ' Hapus');
    buttonkonten.appendChild(buttonhapus);

    const buttonarsip = document.createElement('button');
    buttonarsip.classList.add(note.archived ? 'button-arsip' : 'button-arsip');
    buttonarsip.addEventListener('click', function () {
      if (note.archived) {
        pemulihanCatatanId(note.id);
        alert('Catatan berhasil dikembalikan.');
      } else {
        asripCatatanId(note.id);
        alert('Catatan berhasil diarsipkan.');
      }
    });

    const iconArsip = document.createElement('i');
    iconArsip.classList.add('fa', note.archived ? 'fa-undo' : 'fa-archive');
    buttonarsip.appendChild(iconArsip);
    buttonarsip.insertAdjacentText('beforeend', note.archived ? ' Pulihkan' : ' Arsipkan');
    buttonkonten.appendChild(buttonarsip);

    card.appendChild(elemenJudul);
    card.appendChild(elemenBody);
    card.appendChild(buttonkonten);

    if (note.archived) {
      kotakCatatanArsipkonten.appendChild(card);
    } else {
      kotakCatatankonten.appendChild(card);
    }
  });
}

function asripCatatanId(idCatatan) {

  const note = dataCatatan.find(note => note.id === idCatatan);

  if (note) {

    note.archived = true;

    menampilkanCatatan();
  }
}

function pemulihanCatatanId(idCatatan) {

  const note = dataCatatan.find(note => note.id === idCatatan);

  if (note) {

    note.archived = false;

    menampilkanCatatan();
  }
}

window.onload = function () {
  menampilkanCatatan();

  document.getElementById('formulirCatatan').addEventListener('submit', function (event) {
    event.preventDefault();
    var title = document.getElementById('judulCatatan').value;
    var content = document.getElementById('kontenIsiCatatan').value;
    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill in both title and content!');
      return;
    }
    tambahCatatanGrid(title, content);
    document.getElementById('formulirCatatan').reset();
    alert('Catatan berhasil ditambahkan.');
  });

  document.getElementById('buttonPencarian').addEventListener('click', function () {
    var searchTerm = document.getElementById('inputPencarian').value.trim().toLowerCase();
    if (searchTerm === '') {
      alert('Tuliskan Judul yang Kamu Cari!');
      return;
    }
    cariCatatan(searchTerm);
  });
};

function cariCatatan(searchTerm) {
  const kotakCatatankonten = document.getElementById('kotakCatatan');
  const kotakCatatanArsipkonten = document.getElementById('kotakCatatanArsip');

  kotakCatatankonten.innerHTML = '';
  kotakCatatanArsipkonten.innerHTML = '';

  const penyaringanCatatan = dataCatatan.filter(note => note.title.toLowerCase().includes(searchTerm));

  penyaringanCatatan.forEach(note => {

    const card = document.createElement('div');
    card.classList.add('card');

    const elemenJudul = document.createElement('h2');
    elemenJudul.textContent = note.title;

    const elemenBody = document.createElement('p');
    elemenBody.textContent = note.body;

    const buttonkonten = document.createElement('div');
    buttonkonten.classList.add('button-konten');

    const buttonedit = document.createElement('button');
    buttonedit.classList.add('button-edit');
    buttonedit.addEventListener('click', function () {
      menampilkanPopUpEditCatatan(note.id, note.title, note.body);
    });

    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa', 'fa-edit');
    buttonedit.appendChild(iconEdit);
    buttonedit.insertAdjacentText('beforeend', ' Edit Data');
    buttonkonten.appendChild(buttonedit);

    const buttonhapus = document.createElement('button');
    buttonhapus.classList.add('button-hapus');
    buttonhapus.addEventListener('click', function () {
      hapusCatatanId(note.id);
      alert('Catatan berhasil dihapus.');
    });

    const iconHapus = document.createElement('i');
    iconHapus.classList.add('fa', 'fa-trash');
    buttonhapus.appendChild(iconHapus);
    buttonhapus.insertAdjacentText('beforeend', ' Hapus');
    buttonkonten.appendChild(buttonhapus);

    const buttonarsip = document.createElement('button');
    buttonarsip.classList.add(note.archived ? 'button-arsip' : 'button-arsip');
    buttonarsip.addEventListener('click', function () {
      if (note.archived) {
        pemulihanCatatanId(note.id);
        alert('Catatan berhasil dikembalikan.');
      } else {
        asripCatatanId(note.id);
        alert('Catatan berhasil diarsipkan.');
      }
    });

    const iconArsip = document.createElement('i');
    iconArsip.classList.add('fa', note.archived ? 'fa-undo' : 'fa-archive');
    buttonarsip.appendChild(iconArsip);
    buttonarsip.insertAdjacentText('beforeend', note.archived ? ' Pulihkan' : ' Arsipkan');
    buttonkonten.appendChild(buttonarsip);


    card.appendChild(elemenJudul);
    card.appendChild(elemenBody);
    card.appendChild(buttonkonten);

    if (note.archived) {
      kotakCatatanArsipkonten.appendChild(card);
    } else {
      kotakCatatankonten.appendChild(card);
    }
  });

  if (penyaringanCatatan.length === 0) {
    alert('Tidak Ada Judul Catatan yang Cocok');
  }
}


function tambahCatatanGrid(title, content) {

  const id = 'notes-' + Date.now();

  const catatanBaru = {
    id: id,
    title: title,
    body: content,
    archived: false
  };
  dataCatatan.unshift(catatanBaru);

  menampilkanCatatan();
}

function hapusCatatanId(idCatatan) {

  const index = dataCatatan.findIndex(note => note.id === idCatatan);
  if (index !== -1) {
    dataCatatan.splice(index, 1);

    menampilkanCatatan();
  }
}

function menampilkanPopUpEditCatatan(id, title, content) {
  var editjudulCatatanInput = document.getElementById('editjudulCatatan');
  var editkontenIsiCatatanInput = document.getElementById('editkontenIsiCatatan');

  editjudulCatatanInput.value = title;
  editkontenIsiCatatanInput.value = content;

  var popUpEditFormulirCatatan = document.getElementById('popUpEditFormulirCatatan');
  popUpEditFormulirCatatan.style.display = 'block';

  editjudulCatatanInput.setAttribute('data-note-id', id);
}

function menyembunyikanPopUpEditCatatan() {
  var popUpEditFormulirCatatan = document.getElementById('popUpEditFormulirCatatan');
  popUpEditFormulirCatatan.style.display = 'none';
}

document.getElementById('editformulirCatatan').addEventListener('submit', function (event) {
  event.preventDefault();
  var editedTitle = document.getElementById('editjudulCatatan').value;
  var editedContent = document.getElementById('editkontenIsiCatatan').value;
  var idCatatan = document.getElementById('editjudulCatatan').getAttribute('data-note-id');

  const noteIndex = dataCatatan.findIndex(note => note.id === idCatatan);
  if (noteIndex !== -1) {
    dataCatatan[noteIndex].title = editedTitle;
    dataCatatan[noteIndex].body = editedContent;

    menampilkanCatatan();
    alert('Catatan berhasil diubah.');
  }

  menyembunyikanPopUpEditCatatan();
});
