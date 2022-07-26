import {createItemInDB, prepareItemsForDeletion, getItemsFromDB, showBlock} from "./main.js";

const createGenre = document.querySelector('#genre-form')
const createGenreBtn = document.querySelector('.create-genre__li')
const getAllGenre = document.querySelector('.get-all-genre__li')
const deleteGenre = document.querySelector('.delete-genre__li')


createGenreBtn.addEventListener('click', () => {
    showBlock('.create-genre')
})

createGenre.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { name: createGenre.genre.value }
    await createItemInDB('/genre/create', data)
    createGenre.reset()
})

getAllGenre.addEventListener('click', async () => {
    showBlock('.list-wrapper')
    await getItemsFromDB('/genre/all')
})

deleteGenre.addEventListener('click', () => {
    showBlock('.list-wrapper')
    prepareItemsForDeletion('/genre/all', '/genre/delete')
})