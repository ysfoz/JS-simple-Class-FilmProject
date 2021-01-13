const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

const ui = new UI();
const storage = new Storagefilm();

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === " ") {
    ui.displayMessages("You must fill all Fields ", "danger");
  } else {
    const newfilm = new Film(title, director, url);

    ui.addFilmToUI(newfilm);
    storage.addFilmToStorage(newfilm);
    ui.displayMessages("This Film was added successfully", "success");
  }

  ui.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault;
}

function deleteFilm(e) {
  const filmName =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent;

  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(filmName);
    ui.displayMessages("You deleted a film successfully", "success");
  }
}

function clearAllFilms() {
  if (confirm("Are you sure that want to remove all films")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}
