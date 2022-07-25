import {showBlock, getElementsForSelect, createItemInDB, editItemInDB, getItemsFromDBForEdit, getItemsFromDB, deteleItemInDB, getEditings} from "./main.js"

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

createOrder.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!localStorage.employeeId)  alert('Выберите сотрудника!')
    const data = {
        employee: localStorage.employeeId,
        buyer: createOrder.buyer[createOrder.buyer.selectedIndex].id,
        film: createOrder.film.value,
        date: createOrder.date.value
    }
    createItemInDB('/order/create', data)
    createOrder.reset()
})

editOrder.addEventListener('submit', (e)=> {
    e.preventDefault()
    const data = {
        id: editOrder.getAttribute('data-itemId'),
        buyer: editOrder.buyer[editOrder.buyer.selectedIndex].id,
        film: editOrder.film[editOrder.film.selectedIndex].id,
        date: editOrder.date.value
    }
    editItemInDB('/order/edit', data)
})

editOrderBtn.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDBForEdit('/order/all').then((result)=> {
        const editings = document.querySelectorAll('.editing')
        editings.forEach(item => {
            item.addEventListener('click', (e)=> {
                getEditings('.edit-order', editOrder, '/order/getOne', item).then(result=> {
                    getElementsForSelect(selectBuyerEdit, '/buyer/all', result.orders[0]["КодПокупателя"])
                    getElementsForSelect(selectFilmEdit, '/film/all', result.orders[0]["КодФильма"])
                    editOrder.date.value = result.orders[0]["Дата"].substring(0, 10)
                })

            })
        })
    })

})

getAllOrder.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/order/all')
})

deleteOrder.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/order/all', '/order/delete')
})
