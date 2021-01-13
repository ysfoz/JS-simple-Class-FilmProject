
const form = document.getElementById('film-form');
const titleElement =document.querySelector('#title');
const directorElement = document.querySelector('#director')
const urlElement = document.querySelector('#url')


const ui = new UI();

eventListener();

function eventListener(){
    form.addEventListener('submit',addFilm);
}

function addFilm(e){
    const title = titleElement.value
    const director = directorElement.value
    const url = urlElement.value

    if (title === '' || director === '' || url === ' '){
       ui.displayMessages('You must fill all Fields ','danger')
    }else{
        const newfilm = new Film(title,director,url)

        ui.addFilmToUI(newfilm);

        ui.displayMessages('This Film was added successfully','success')
    }

    ui.clearInputs(titleElement,urlElement,directorElement)
    e.preventDefault
}