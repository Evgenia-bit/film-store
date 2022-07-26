const mainBlock = document.querySelector('#main')
const mainList = document.querySelectorAll('.main-list__item')
const manual = document.querySelector('.manual')
const closeBtns = document.querySelectorAll('.close-form')

import {ResultBlock} from './utils/ResultBlock.js'

const resultBlock = new ResultBlock(document.querySelector('.result'))


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
    document.querySelectorAll('.wrapper').forEach(item => {
        item.classList.add('none')
    })
    resultBlock.setContent('')
    manual.textContent = ''
    document.querySelector(elem).classList.remove('none');
}

function closeBlock() {
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.parentNode.classList.add('none')
            if (item.parentNode.querySelector('ul')) item.parentNode.querySelector('ul').innerHTML = ''
            resultBlock.setContent('')
            manual.textContent = ''
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

function getElementsForSelect(select, url, selected = null) {
    select.innerHTML = ' <option value="Загрузка....">Загрузка....</option>'
    request(url, 'GET').then(result => {
        select.innerHTML = ''
        let value;
        let code;
        for (let key in result.elements) {
            if (result.fullnames) {
                value = result.fullnames[key];
            } else {
                value = result.elements[key];
            }
            code = result.codes[key]
            select.insertAdjacentHTML("beforeEnd", `
                <option id="${code}" ${selected === code ? 'selected' : ''} value="${value}">${value}</option>
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

function getEditings(block, form, url, item) {
    return request(url, 'POST', {id: item.getAttribute('data-id')}).then(result => {
        if(result.status == 'OK') {
            resultBlock.setSuccessfulResultStatus(result.msg)
            showBlock(block)
            form.setAttribute('data-itemId', item.getAttribute('data-id'));
            return result;
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
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
}

function getItemsFromDB(url) {
    resultBlock.setReceiptStatus()
    return request(url, 'GET').then(result => {
        if (result.status == "OK") {
            resultBlock.setSuccessfulResultStatus(result.msg)
            printItems(result)
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
    })
}

function getItemsFromDBForEdit(url) {
    resultBlock.setReceiptStatus()
    manual.textContent = 'Нажмите на строку, которую хотите изменить';
    return request(url, 'GET').then(result => {
        if (result.status == "OK") {
            resultBlock.setSuccessfulResultStatus(result.msg)
            printItemsForEdit(result)
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
    })
}



async function createItemInDB(url, data) {
    await updateItemInDB({url, method: 'POST', data})
}

async function editItemInDB(url, data) {
    await updateItemInDB({url, method: 'PUT', data})
}

function updateItemInDB({url, method, data}) {
    resultBlock.setSendingStatus()
    return request(url, method, data).then(result => {
        if (result.status == "OK") {
            resultBlock.setSuccessfulResultStatus(result.msg)
            return result;
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
    })
}

function deteleItemInDB(urlForGetElem, urlForDeleteElem) {
    manual.textContent = "Нажмите на элемент, чтобы удалить его"
    getItemsFromDB(urlForGetElem).then(() => {
        document.querySelectorAll('tr.list-row').forEach(item => {
            item.classList.add('delete')
            item.addEventListener('click', (e) => {
                if (item.classList.contains('delete')) {
                    item.remove()
                    const data = {}
                    const items = item.querySelectorAll('.item');
                    items.forEach((item, i) => {
                        data[i] = item.textContent;
                    })
                    request(urlForDeleteElem, 'DELETE', data).then(result => {
                        if (result.status == "OK") {
                            resultBlock.setSuccessfulResultStatus(result.msg)
                        } else {
                            resultBlock.setErrorStatus(result.msg)
                        }
                    })
                }
            })
        })
    })
}


showSublist()
closeBlock()


export {
    request,
    showBlock,
    getElementsForSelect,
    createItemInDB,
    editItemInDB,
    getItemsFromDBForEdit,
    getItemsFromDB,
    deteleItemInDB,
    getEditings
}

