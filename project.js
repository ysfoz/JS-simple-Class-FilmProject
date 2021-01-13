
const form = document.querySelector('#film-form');
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody =document.querySelectorAll('.card-body')[1]


const ui = new UI();
const storage = new Storagefilm();

eventListeners()

function eventListeners(){
    form.addEventListener('submit',addFilm);
    document.addEventListener('DOMContentLoaded',function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films)
    })
    cardBody.addEventListener('click',deleteFilm)
}

function addFilm(e){
    const title = titleElement.value;
    console.log("🚀 ~ file: project.js ~ line 23 ~ addFilm ~ title", title)
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === '' || director === '' || url === ' '){
       ui.displayMessages('You must fill all Fields ','danger')
    }else{
        const newfilm = new Film(title,director,url)

        ui.addFilmToUI(newfilm);
        storage.addFilmToStorage(newfilm);
        ui.displayMessages('This Film was added successfully','success');
    }

    ui.clearInputs(titleElement,urlElement,directorElement)
    e.preventDefault
}

function deleteFilm(e){
    if (e.target.id === 'delete-film'){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        ui.displayMessages('You deleted a film successfully','success')

    }
}