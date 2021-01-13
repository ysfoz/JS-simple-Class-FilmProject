const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storagefilm.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === " ") {
    UI.displayMessages("You should fill all Fields ", "danger");
  } else {
    const newfilm = new Film(title, director, url);

    UI.addFilmToUI(newfilm);
    Storagefilm.addFilmToStorage(newfilm);
    UI.displayMessages("This Film was added successfully", "success");
  }

  UI.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault;
}

function deleteFilm(e) {
  const filmName =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent;

  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storagefilm.deleteFilmFromStorage(filmName);
    UI.displayMessages("You deleted a film successfully", "success");
  }
}

function clearAllFilms() {
  if (confirm("Are you sure that want to remove all films")) {
    UI.clearAllFilmsFromUI();
    Storagefilm.clearAllFilmsFromStorage();
  }
}
