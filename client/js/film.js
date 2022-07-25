import {
    createItemInDB, deteleItemInDB,
    editItemInDB,
    getEditings,
    getElementsForSelect, getItemsFromDB,
    getItemsFromDBForEdit,
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

console.log(createFilm)


createFilmBtn.addEventListener('click', () => {
    showBlock('.create-film')
    getElementsForSelect(selectGenre, '/genre/all')
})
createFilm.addEventListener('submit', (e) => {
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
    createItemInDB('/film/create', data)
   // createFilm.reset()
})
editFilmBtn.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDBForEdit('/film/all').then(()=> {
        const editings = document.querySelectorAll('.editing')
        editings.forEach(item => {
            item.addEventListener('click', (e)=> {
                getEditings('.edit-film', editFilm, '/film/getOne', item).then(result=> {
                    console.log(result)
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
})
editFilm.addEventListener('submit', (e)=> {
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
    editItemInDB('/film/edit', data)

})
getAllFilm.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/film/all')
})
deleteFilm.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/film/all', '/film/delete')
})
