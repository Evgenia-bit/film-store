import {
    createItemInDB,
    prepareItemsForDeletion,
    editItemInDB,
    getReadyToEditElement,
    getElementsForSelect, getItemsFromDB,
    prepareItemsForEdit,
    showBlock
} from "./main.js";

const createFilm = document.querySelector('#film-form')
const editFilm = document.querySelector('#edit-film')
const createFilmBtn = document.querySelector('.create-film__li')
const editFilmBtn = document.querySelector('.edit-film__li')
const getAllFilm = document.querySelector('.get-all-film__li')
const deleteFilm = document.querySelector('.delete-film__li')

const selectGenre = document.querySelector('#genre')
const selectGenreEdit = document.querySelector('#genre-edit')


createFilmBtn.addEventListener('click', () => {
    showBlock('.create-film')
    getElementsForSelect(selectGenre, '/genre/all')
})

createFilm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        genre: createFilm.genre.value,
        name: createFilm.name.value,
        price: createFilm.price.value,
        duration: createFilm.duration.value,
        country: createFilm.country.value,
        year: createFilm.year.value,
        description: createFilm.description.value,
        cast: createFilm.cast.value,
    }
    await createItemInDB('/film/create', data)
})

editFilmBtn.addEventListener('click', async () => {
    showBlock('.list-wrapper')
    await prepareItemsForEdit('/film/all')
    const readyToEditElements = document.querySelectorAll('.editing')
    readyToEditElements.forEach(element => {
        element.addEventListener('click', (e) => {
            getReadyToEditElement('.edit-film', editFilm, '/film/getOne', element).then(result => {
                getElementsForSelect(selectGenreEdit, '/genre/all', result.film[0]["КодЖанра"])
                editFilm.name.value = result.film[0]["Наименование"]
                editFilm.price.value = result.film[0]["Цена"]
                editFilm.duration.value = result.film[0]["Длительность"]
                editFilm.country.value = result.film[0]["Страна"]
                editFilm.year.value = result.film[0]["Год"]
                editFilm.description.value = result.film[0]["Описание"]
                editFilm.cast.value = result.film[0]["АктёрскийСостав"]
            })
        })
    })
})

editFilm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
        id: editFilm.getAttribute('data-itemId'),
        genre: editFilm.genre[editFilm.genre.selectedIndex].id,
        name: editFilm.name.value,
        price: editFilm.price.value,
        duration: editFilm.duration.value,
        country: editFilm.country.value,
        year: editFilm.year.value,
        description: editFilm.description.value,
        cast: editFilm.cast.value,
    }
    await editItemInDB('/film/edit', data)
})

getAllFilm.addEventListener('click', async () => {
    showBlock('.list-wrapper')
    await getItemsFromDB('/film/all')
})

deleteFilm.addEventListener('click', () => {
    showBlock('.list-wrapper')
    prepareItemsForDeletion('/film/all', '/film/delete')
})
