import {createItemInDB, prepareItemsForDeletion, getItemsFromDB, showBlock} from "./main.js";

const createBuyer = document.querySelector('#buyer-form')
const createBuyerBtn = document.querySelector('.create-buyer__li')
const getAllBuyer = document.querySelector('.get-all-buyer__li')
const deleteBuyer = document.querySelector('.delete-buyer__li')

createBuyerBtn.addEventListener('click', () => {
    showBlock('.create-buyer')
})

createBuyer.addEventListener('submit', async (e) => {
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
    await createItemInDB('/buyer/create', data)
    createBuyer.reset()
})

getAllBuyer.addEventListener('click', async () => {
    showBlock('.list-wrapper')
    await getItemsFromDB('/buyer/all')
})

deleteBuyer.addEventListener('click', async () => {
    showBlock('.list-wrapper')
    await prepareItemsForDeletion('/buyer/all', '/buyer/delete')
})