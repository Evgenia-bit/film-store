import {showBlock, getElementsForSelect, createItemInDB, editItemInDB, prepareItemsForEdit, getItemsFromDB, prepareItemsForDeletion, getReadyToEditElement} from "./main.js"

const createOrder = document.querySelector('#order-form')
const editOrder = document.querySelector('#edit-order')
const createOrderBtn = document.querySelector('.create-order__li')
const editOrderBtn = document.querySelector('.edit-order__li')
const getAllOrder = document.querySelector('.get-all-order__li')
const deleteOrder = document.querySelector('.delete-order__li')
const selectBuyer = document.querySelector('#buyer')
const selectFilm = document.querySelector('#film')
const selectFilmEdit = document.querySelector('#film-edit')
const selectBuyerEdit = document.querySelector('#buyer-edit')

createOrderBtn.addEventListener('click', () => {
    showBlock('.create-order')
    getElementsForSelect(selectBuyer, '/buyer/all')
    getElementsForSelect(selectFilm, '/film/all')
})

createOrder.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!localStorage.employeeId)  alert('Выберите сотрудника!')
    const data = {
        employee: localStorage.employeeId,
        buyer: createOrder.buyer[createOrder.buyer.selectedIndex].id,
        film: createOrder.film.value,
        date: createOrder.date.value
    }
    await createItemInDB('/order/create', data)
    createOrder.reset()
})

editOrder.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
        id: editOrder.getAttribute('data-itemId'),
        buyer: editOrder.buyer[editOrder.buyer.selectedIndex].id,
        film: editOrder.film[editOrder.film.selectedIndex].id,
        date: editOrder.date.value
    }
    await editItemInDB('/order/edit', data)
})

editOrderBtn.addEventListener('click', () => {
    showBlock('.list-wrapper')
    prepareItemsForEdit('/order/all').then((result)=> {
        const editings = document.querySelectorAll('.editing')
        editings.forEach(item => {
            item.addEventListener('click', (e)=> {
                getReadyToEditElement('.edit-order', editOrder, '/order/getOne', item).then(result=> {
                    getElementsForSelect(selectBuyerEdit, '/buyer/all', result.orders[0]["КодПокупателя"])
                    getElementsForSelect(selectFilmEdit, '/film/all', result.orders[0]["КодФильма"])
                    editOrder.date.value = result.orders[0]["Дата"].substring(0, 10)
                })
            })
        })
    })
})

getAllOrder.addEventListener('click', async() => {
    showBlock('.list-wrapper')
    await getItemsFromDB('/order/all')
})

deleteOrder.addEventListener('click', () => {
    showBlock('.list-wrapper')
    prepareItemsForDeletion('/order/all', '/order/delete')
})
