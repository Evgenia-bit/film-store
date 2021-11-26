const mainBlock = document.querySelector('#main')
const mainList = document.querySelectorAll('.main-list__item')
const resultBlock = document.querySelector('.result')
const closeBtns = document.querySelectorAll('.close-form')

const createOrder = document.querySelector('#order-form')
const selectBuyer = document.querySelector('#buyer')
const selectFilm = document.querySelector('#film')
const createOrderBtn = document.querySelector('.create-order__li')
const getAllOrder = document.querySelector('.get-all-order__li')
const deleteOrder = document.querySelector('.delete-order__li')

const createFilm = document.querySelector('#film-form')
const createFilmBtn = document.querySelector('.create-film__li')
const getAllFilm = document.querySelector('.get-all-film__li')
const deleteFilm = document.querySelector('.delete-film__li')

const createGenre = document.querySelector('#genre-form')
const selectGenre = document.querySelector('#genre')
const createGenreBtn = document.querySelector('.create-genre__li')
const getAllGenre = document.querySelector('.get-all-genre__li')
const deleteGenre = document.querySelector('.delete-genre__li')

const createBuyer = document.querySelector('#buyer-form')
const createBuyerBtn = document.querySelector('.create-buyer__li')
const getAllBuyer = document.querySelector('.get-all-buyer__li')
const deleteBuyer = document.querySelector('.delete-buyer__li')

const changeEmployee = document.querySelector('.change-employee')
const changeEmployeeForm = document.querySelector('.choose-employee-form')
const selectEmployee = document.querySelector('#employee')
const currentEmployee = document.querySelector('.current-employee')
const changeEmployeeSubmit = document.querySelector('.change-employee-submit')

function showSublist() {
    mainList.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-list__item-link')) {
                item.querySelector('.sublist').classList.toggle('none');
            }
        })
    })
}

function showBlock(form) {
    document.querySelector(form).classList.remove('none');
}

function closeBlock() {
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.classList.add('none')
            if (item.parentNode.querySelector('ul')) item.parentNode.querySelector('ul').innerHTML = ''
            resultBlock.innerHTML = '';
        })
    })
}

function request(url, method, data = null) {
    try {
        let body
        if (data) body = JSON.stringify(data)
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
            .then(response => response.json())
    } catch (e) {
        console.warn('Error', e.message)
    }
}

function getElementsForSelect(select, url) {
    select.innerHTML = ' <option value="Загрузка....">Загрузка....</option>'
    request(url, 'GET').then(result => {
        select.innerHTML = ''
        let value;
        let code;
        for (var key in result.elements) {
            if(typeof result.elements[key] === 'object') {
                value = Object.values(result.elements[key])[0];  
            } else {
                value = result.elements[key];
            }
            code = result.codes[key]
            select.insertAdjacentHTML("beforeEnd", `
                <option id="${code}" value="${value}">${value}</option>
            `)
        }
    })
}

function printItems(result) {
    mainBlock.querySelector('.list-title').textContent = result.title;
    for (var key in result.elements) {
        mainBlock.querySelector('.list').insertAdjacentHTML("beforeEnd", `
            <li class="list-item">
            </li><br/><br/>`)
        const listItems = mainBlock.querySelectorAll('.list-item')
        if (typeof result.elements[key] === 'object') {
            for (var k in result.elements[key]) {
                const listItems = mainBlock.querySelectorAll('.list-item')
                listItems[listItems.length - 1].insertAdjacentHTML("beforeEnd", `
                        <span class="title">${k}: </span>
                        <span class="item">${result.elements[key][k]}</span><br/>`)
            }
        } else {
            listItems[listItems.length - 1].insertAdjacentHTML("beforeEnd", `
               
                    <span  class="name item">${result.elements[key]}</span>
               
            `)
        }
    }
}

function getItemsFromDB(url) {
    resultBlock.style.color = 'black'
    resultBlock.innerHTML = 'Получение.....'
    return request(url, 'GET').then(result => {
        createFilm.reset()
        resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
        resultBlock.innerHTML = result.msg;
        if (result.status == "OK") printItems(result)
    })
}

function createItemInDB(url, data) {
    resultBlock.style.color = 'black'
    resultBlock.innerHTML = 'Отправка.....'
    request(url, 'POST', data).then(result => {
        createFilm.reset()
        resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
        resultBlock.innerHTML = result.msg;
    })
}

function deteleItemInDB(urlForGetElem, urlForDeleteElem) {
    getItemsFromDB(urlForGetElem).then(() => {
        document.querySelectorAll('.list-item').forEach(item => {
            item.insertAdjacentHTML("beforeEnd", `
                <span class="delete">
                    Удалить &#9746;
                </span>
            `)
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete')) {
                    item.remove()
                    const data = {}
                    const items = item.querySelectorAll('.item');
                    items.forEach((item, i) => {
                        data[i] = item.textContent;
                    })
                    request(urlForDeleteElem, 'DELETE', data).then(result => {
                        resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
                        resultBlock.innerHTML = result.msg;
                    })
                }
            })
        })
    })
}


showSublist()
closeBlock()



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
})
getAllFilm.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/film/all')
})
deleteFilm.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/film/all', '/film/delete')
})

createGenreBtn.addEventListener('click', () => {
    showBlock('.create-genre')
})
createGenre.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = { name: createGenre.genre.value }
    createItemInDB('/genre/create', data)
})
getAllGenre.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/genre/all')
})
deleteGenre.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/genre/all', '/genre/delete')
})

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
})
getAllBuyer.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/buyer/all')
})
deleteBuyer.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/buyer/all', '/buyer/delete')
})

createOrderBtn.addEventListener('click', () => {
    showBlock('.create-order')
    getElementsForSelect(selectBuyer, '/buyer/all')
    getElementsForSelect(selectFilm, '/film/all')
})
createOrder.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        employee: 1,
        buyer: createOrder.buyer.value,
        film: createOrder.film.value,
        date: createOrder.date.value
    }
    createItemInDB('/order/create', data)
})
getAllOrder.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDB('/order/all')
})
deleteOrder.addEventListener('click', () => {
    showBlock('.list-wrapper')
    deteleItemInDB('/order/all', '/order/delete')
})


changeEmployee.addEventListener('click', ()=> {
    selectEmployee.classList.remove('none')
    currentEmployee.classList.add('none')
    getElementsForSelect(selectEmployee, '/employee/all')
    changeEmployee.classList.add('none')
    changeEmployeeSubmit.classList.remove('none')
})
changeEmployeeForm.addEventListener('submit', (e)=> { 
    e.preventDefault()
    
    console.log(changeEmployeeForm[changeEmployeeForm.employee.selectedIndex].id)
})




