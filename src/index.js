import "./components/footer.js";
import "./components/navbar.js";
import "./components/jumbotron.js";
import "./components/aside.js";
import "./styles/styles.css";

const ApiUtama = "https://notes-api.dicoding.dev/v2";

function menampilkanCatatan() {
  document.getElementById("loading").style.display = "block";

  Promise.all([fetch(`${ApiUtama}/notes`), fetch(`${ApiUtama}/notes/archived`)])
    .then((responses) => {
      return Promise.all(responses.map((response) => response.json()));
    })
    .then((data) => {
      const allNotes = [...data[0].data, ...data[1].data];

      const kotakCatatankonten = document.getElementById("kotakCatatan");
      const kotakCatatanArsipkonten =
        document.getElementById("kotakCatatanArsip");

      kotakCatatankonten.innerHTML = "";
      kotakCatatanArsipkonten.innerHTML = "";

      if (Array.isArray(allNotes)) {
        allNotes.forEach((note) => {
          const card = document.createElement("div");
          card.classList.add("card");

          const elemenJudul = document.createElement("h2");
          elemenJudul.textContent = note.title;

          const elemenBody = document.createElement("p");
          elemenBody.textContent = note.body;

          const buttonkonten = document.createElement("div");
          buttonkonten.classList.add("button-konten");

          const buttonedit = document.createElement("button");
          buttonedit.classList.add("button-edit");
          buttonedit.addEventListener("click", function () {
            tampilkanPopUpEditCatatan(note.id, note.title, note.body);
          });
          buttonedit.textContent = "Edit Data";
          buttonkonten.appendChild(buttonedit);

          const buttonhapus = document.createElement("button");
          buttonhapus.classList.add("button-hapus");
          buttonhapus.addEventListener("click", function () {
            hapusCatatanId(note.id);
          });
          buttonhapus.textContent = "Hapus";
          buttonkonten.appendChild(buttonhapus);

          const buttonarsip = document.createElement("button");
          buttonarsip.classList.add(
            note.archived ? "button-arsip" : "button-arsip"
          );
          buttonarsip.addEventListener("click", function () {
            if (note.archived) {
              pemulihanCatatanId(note.id);
            } else {
              arsipCatatanId(note.id);
            }
          });
          buttonarsip.textContent = note.archived ? "Pulihkan" : "Arsipkan";
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
      } else {
        console.error("Data is not an array:", data);
      }

      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching notes:", error);
      document.getElementById("loading").style.display = "none";
    });
}

function tambahCatatanGrid(title, content) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      body: content,
    }),
  };

  fetch(`${ApiUtama}/notes`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      if (data.status === "success") {
        console.log("Note created successfully.");
        menampilkanCatatan();
      } else {
        console.error("Failed to create note:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error creating note:", error);
    });
}

function hapusCatatanId(idCatatan) {
  const requestOptions = {
    method: "DELETE",
  };

  fetch(`${ApiUtama}/notes/${idCatatan}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      menampilkanCatatan();
      alert("Catatan berhasil kamu hapus.");
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      alert("Mohon maaf kamu gagal menghapus.");
    });
}

function arsipCatatanId(idCatatan) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      archived: true,
    }),
  };

  fetch(`${ApiUtama}/notes/${idCatatan}/archive`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to archive note.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      menampilkanCatatan();
      alert("Catatan berhasil kamu arsipkan");
    })
    .catch((error) => {
      console.error("Error archiving note:", error);
      alert("Mohon maaf kamu gagal mengarsipkan nih.");
    });
}

function pemulihanCatatanId(idCatatan) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      archived: false,
    }),
  };

  fetch(`${ApiUtama}/notes/${idCatatan}/unarchive`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to restore note.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      menampilkanCatatan();
      alert("Arsip kamu berhasil kembali ke catatan.");
    })
    .catch((error) => {
      console.error("Error restoring note:", error);
      alert("Mohon maaf kamu gagal mengembalikan catatan.");
    });
}

window.onload = function () {
  menampilkanCatatan();

  document
    .getElementById("formulirCatatan")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var title = document.getElementById("judulCatatan").value;
      var content = document.getElementById("kontenIsiCatatan").value;
      if (title.trim() === "" || content.trim() === "") {
        alert("Please fill in both title and content!");
        return;
      }
      tambahCatatanGrid(title, content);
      document.getElementById("formulirCatatan").reset();
      alert("Catatan berhasil ditambahkan.");
    });

  document
    .getElementById("buttonPencarian")
    .addEventListener("click", function () {
      var searchTerm = document
        .getElementById("inputPencarian")
        .value.trim()
        .toLowerCase();
      if (searchTerm === "") {
        alert("Tuliskan Judul yang Kamu Cari!");
        return;
      }
      cariCatatan(searchTerm);
    });
};

function cariCatatan(searchTerm) {
  Promise.all([
    fetch(`${ApiUtama}/notes?q=${searchTerm}`),
    fetch(`${ApiUtama}/notes/archived?q=${searchTerm}`),
  ])
    .then((responses) => {
      return Promise.all(responses.map((response) => response.json()));
    })
    .then((data) => {
      const allNotes = [...data[0], ...data[1]]; // Menggabungkan catatan biasa dan yang diarsipkan

      const kotakCatatankonten = document.getElementById("kotakCatatan");
      const kotakCatatanArsipkonten =
        document.getElementById("kotakCatatanArsip");

      kotakCatatankonten.innerHTML = "";
      kotakCatatanArsipkonten.innerHTML = "";

      if (Array.isArray(allNotes)) {
        allNotes.forEach((note) => {
          const card = document.createElement("div");
          card.classList.add("card");

          const elemenJudul = document.createElement("h2");
          elemenJudul.textContent = note.title;

          const elemenBody = document.createElement("p");
          elemenBody.textContent = note.body;

          const buttonkonten = document.createElement("div");
          buttonkonten.classList.add("button-konten");

          const buttonedit = document.createElement("button");
          buttonedit.classList.add("button-edit");
          buttonedit.addEventListener("click", function () {
            tampilkanPopUpEditCatatan(note.id, note.title, note.body);
          });
          buttonedit.textContent = "Edit Data";
          buttonkonten.appendChild(buttonedit);

          const buttonhapus = document.createElement("button");
          buttonhapus.classList.add("button-hapus");
          buttonhapus.addEventListener("click", function () {
            hapusCatatanId(note.id);
          });
          buttonhapus.textContent = "Hapus";
          buttonkonten.appendChild(buttonhapus);

          const buttonarsip = document.createElement("button");
          buttonarsip.classList.add(
            note.archived ? "button-arsip" : "button-arsip"
          );
          buttonarsip.addEventListener("click", function () {
            if (note.archived) {
              pemulihanCatatanId(note.id);
            } else {
              arsipCatatanId(note.id);
            }
          });
          buttonarsip.textContent = note.archived ? "Pulihkan" : "Arsipkan";
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
      } else {
        console.error("Data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error searching notes:", error);
    });
}

function tampilkanPopUpEditCatatan(id, title, content) {
  var editjudulCatatanInput = document.getElementById("editjudulCatatan");
  var editkontenIsiCatatanInput = document.getElementById(
    "editkontenIsiCatatan"
  );

  editjudulCatatanInput.value = title;
  editkontenIsiCatatanInput.value = content;

  var popUpEditFormulirCatatan = document.getElementById(
    "popUpEditFormulirCatatan"
  );
  popUpEditFormulirCatatan.style.display = "block";

  editjudulCatatanInput.setAttribute("data-note-id", id);
}

function menyembunyikanPopUpEditCatatan() {
  var popUpEditFormulirCatatan = document.getElementById(
    "popUpEditFormulirCatatan"
  );
  popUpEditFormulirCatatan.style.display = "none";
}

document
  .getElementById("editformulirCatatan")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var editedTitle = document.getElementById("editjudulCatatan").value;
    var editedContent = document.getElementById("editkontenIsiCatatan").value;
    var idCatatan = document
      .getElementById("editjudulCatatan")
      .getAttribute("data-note-id");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedTitle,
        body: editedContent,
      }),
    };

    fetch(`${ApiUtama}/notes/${idCatatan}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update note.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        menampilkanCatatan();
        alert("Catatan berhasil diubah.");
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });

    menyembunyikanPopUpEditCatatan();
  });

gsap.from("#kotakCatatan", { opacity: 0, duration: 1, ease: "power2.inOut" });
gsap.from("#kotakCatatanArsip", {
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
});
