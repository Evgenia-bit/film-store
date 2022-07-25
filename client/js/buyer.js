import {createItemInDB, deteleItemInDB, getItemsFromDB, showBlock} from "./main.js";

const createBuyer = document.querySelector('#buyer-form')
const createBuyerBtn = document.querySelector('.create-buyer__li')
const getAllBuyer = document.querySelector('.get-all-buyer__li')
const deleteBuyer = document.querySelector('.delete-buyer__li')

createBuyerBtn.addEventListener('click', () => {
    showBlock('.create-buyer')
})
createBuyer.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        surname: createBuyer.surname.value,
        name: createBuyer.name.value,
        patronymic: createBuyer.patronymic.value,
        series: createBuyer.series.value,
        number: createBuyer.number.value,
        whoIssued: createBuyer.whoIssued.value,
        whenIssued: createBuyer.whenIssued.value,
        place: createBuyer.place.value,
        phone: createBuyer.phone.value
    }
    createItemInDB('/buyer/create', data)
    createBuyer.reset()
})
getAllBuyer.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/buyer/all')
})
deleteBuyer.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/buyer/all', '/buyer/delete')
})