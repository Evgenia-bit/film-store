const mainBlock = document.querySelector('#main')
const mainList = document.querySelectorAll('.main-list__item')
const resultBlock = document.querySelector('.result')
const closeBtns = document.querySelectorAll('.close-form')

const createOrder = document.querySelector('#order-form')
const editOrder = document.querySelector('#edit-form')
const selectFilmEdit = document.querySelector('#film-edit')
const selectBuyerEdit = document.querySelector('#buyer-edit')
const selectBuyer = document.querySelector('#buyer')
const selectFilm = document.querySelector('#film')
const createOrderBtn = document.querySelector('.create-order__li')
const editOrderBtn = document.querySelector('.edit-order__li')
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


const createReportRevenueBtn = document.querySelector('.create-report-about-revenue_li')
const createReportRevenue = document.querySelector('#revenue-form')
const createReportEmployee = document.querySelector('#employee-form')
const createReportEmployeeRevenueBtn = document.querySelector('.create-report-about-employee_li')
const reportRevenue = document.querySelector('.report-revenue')
const reportEmployee = document.querySelector('.report-employee')
const selectEmployeeForReport = document.querySelector('#employee-for-report')


function showSublist() {
    mainList.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-list__item-link')) {
                item.querySelector('.sublist').classList.toggle('none');
            }
        })
    })
}

function showBlock(elem) {
    document.querySelector('.list').innerHTML = ''
    document.querySelectorAll('.wrapper').forEach(item=> {
        item.classList.add('none')
    })
    resultBlock.innerHTML = ''
    document.querySelector(elem).classList.remove('none');
}

function closeBlock() {
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.parentNode.classList.add('none')
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
        console.log(result)
        select.innerHTML = ''
        let value;
        let code;
        for (let key in result.elements) {
            if(result.fullnames) {
                value = result.fullnames[key];
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
    document.querySelector('.list-title').textContent = result.title;
    const list = mainBlock.querySelector('.list')
    list.insertAdjacentHTML("beforeEnd", `<tr class="list-row-title"></tr>`)
    for (let key in result.elements[0]) {
        const listRowTitle = mainBlock.querySelector('.list-row-title')
        listRowTitle.insertAdjacentHTML("beforeEnd", `<th class="title" data-id="">${key}</th>`)
    }
    for (let key in result.elements) {
        list.insertAdjacentHTML("beforeEnd", ` <tr class="list-row"></tr>`)
        const listRows = mainBlock.querySelectorAll('.list-row')
        for (let k in result.elements[key]) {
            listRows[listRows.length - 1].insertAdjacentHTML("beforeEnd", `<td class="item">${result.elements[key][k]}</td>`)
        }
    }
}
function getEditings(){
    const editings = document.querySelectorAll('.editing')
    editings.forEach(item => {
        item.addEventListener('click', (e)=> {

          /*  const data = {
                'id': item.parentNode.parentNode.getAttribute('data-id'),
                name: item.name,
                value: item.value,
            }*/
            showBlock('.edit-order')
            getElementsForSelect(selectBuyerEdit, '/buyer/all')
            getElementsForSelect(selectFilmEdit, '/film/all')
            return request('/order/getOne', 'POST', {id: item.getAttribute('data-id')}).then(result => {
                resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
                resultBlock.innerHTML = result.msg;
            })
        })
    })
}
function printItemsForEdit(result) {
    document.querySelector('.list-title').textContent = result.title;
    const list = mainBlock.querySelector('.list')
    list.insertAdjacentHTML("beforeEnd", `<tr class="list-row-title"></tr>`)
    for (let key in result.elements[0]) {
        const listRowTitle = mainBlock.querySelector('.list-row-title')
        listRowTitle.insertAdjacentHTML("beforeEnd", `<th class="title" data-id="">${key}</th>`)
    }
    for (let key in result.elements) {
        list.insertAdjacentHTML("beforeEnd", ` <tr class="list-row editing" data-id="${Object.values(result.elements[key])[0]}"></tr>`)
        const listRows = mainBlock.querySelectorAll('.list-row')
        for (let k in result.elements[key]) {
                listRows[listRows.length - 1].insertAdjacentHTML("beforeEnd", `<td class="item">${result.elements[key][k]}</td>`)
        }

    }
    getEditings()

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
function getItemsFromDBForEdit(url) {
    resultBlock.style.color = 'black'
    resultBlock.innerHTML = 'Получение.....'
    return request(url, 'GET').then(result => {
        createFilm.reset()
        resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
        resultBlock.innerHTML = result.msg;
        if (result.status == "OK") printItemsForEdit(result)
    })
}
function createItemInDB(url, data) {
    resultBlock.style.color = 'black'
    resultBlock.innerHTML = 'Отправка.....'
    return request(url, 'POST', data).then(result => {
        resultBlock.style.color = result.status == 'OK' ? '#73F55B' : 'red';
        resultBlock.innerHTML = result.msg;
        return result;
    })
}

function deteleItemInDB(urlForGetElem, urlForDeleteElem) {
    getItemsFromDB(urlForGetElem).then(() => {
        document.querySelectorAll('tr.list-row').forEach(item => {
            item.insertAdjacentHTML("beforeEnd", `
                <span class="delete">
                    &#9746;
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
    createFilm.reset()
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
    createGenre.reset()
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

createOrderBtn.addEventListener('click', () => {
    showBlock('.create-order')
    getElementsForSelect(selectBuyer, '/buyer/all')
    getElementsForSelect(selectFilm, '/film/all')
})
editOrderBtn.addEventListener('click', () => {
    showBlock('.list-wrapper')
    getItemsFromDBForEdit('/order/all')

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
    if(changeEmployeeForm.employee[changeEmployeeForm.employee.selectedIndex].id) {
        localStorage.setItem('employeeId', changeEmployeeForm.employee[changeEmployeeForm.employee.selectedIndex].id);
        selectEmployee.classList.add('none')
        currentEmployee.textContent = changeEmployeeForm.employee[changeEmployeeForm.employee.selectedIndex].value;
        currentEmployee.classList.remove('none')
        changeEmployee.classList.remove('none')
        changeEmployeeSubmit.classList.add('none')
    }
    changeEmployeeForm.reset()
})

createReportRevenueBtn.addEventListener('click',()=> {
   showBlock('.report-revenue')
})
createReportRevenue.addEventListener('submit', (e)=> {
    e.preventDefault()
    const data = {
        start: createReportRevenue.datestart.value,
        end: createReportRevenue.dateend.value,
    }
    createItemInDB('/report/revenue', data).then((res)=> {
        reportRevenue.querySelector('.start').innerHTML = data.start;
        reportRevenue.querySelector('.end').innerHTML = data.end;
        const allRowsFromTable =  reportRevenue.querySelectorAll('tr');
        for(let i = 3; i < allRowsFromTable.length; i++) {
            allRowsFromTable[i].remove()
        }
        res.items.forEach(item=> {
            reportRevenue.querySelector('tbody').insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${item['Наименование_жанра']}
                </td>
                <td>
                    ${item['Количество']}
                </td>
                <td>
                    ${item['Выручка']}
                </td>
                <td>
                    ${item['Средня_выручка_за_фильм']}
                </td>
            </tr>
        `)
        })
        
    
    })
})
createReportEmployeeRevenueBtn.addEventListener('click',()=> {
    showBlock('.report-employee')
    getElementsForSelect(selectEmployeeForReport, '/employee/all')
})

createReportEmployee.addEventListener('submit', (e)=> {
    e.preventDefault();
    const data = {
        start: createReportEmployee.datestart.value,
        end: createReportEmployee.dateend.value,
        employee: createReportEmployee.employeeForReport[createReportEmployee.employeeForReport.selectedIndex].id,
    }
    createItemInDB('/report/employee', data).then( result=> {
        reportEmployee.querySelector('.start').innerHTML = data.start;
        reportEmployee.querySelector('.end').innerHTML = data.end;
        reportEmployee.querySelector('#employee-name').innerHTML = createReportEmployee.employeeForReport.value;
        const allRowsFromTable =  reportEmployee.querySelectorAll('tr');
        for(let i = 3; i < allRowsFromTable.length; i++) {
            allRowsFromTable[i].remove()
        }
        console.log(result)
        result.items.forEach(item=> {
            reportEmployee.querySelector('tbody').insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${item['Дата'].slice(0, 10)}
                </td>
                <td>
                    ${item['Фильм']}
                </td>
                <td>
                    ${item['Цена']}
                </td>
            </tr>
        `)
        })
    }).catch(e=> {
        console.log(e)
    })
})


function getCurrentEmployee () {
    if(localStorage.employeeId) {
        request(`/employee/all${localStorage.employeeId}`, 'POST').then(res => {
            currentEmployee.textContent = res.currentEmployee;
        })
    } else {
        currentEmployee.textContent = 'Сотрудник не выбран. Выберите сотрудника';
    }
}

getCurrentEmployee ()

