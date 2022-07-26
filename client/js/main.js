import {ResultBlock} from './utils/ResultBlock.js'

const resultBlock = new ResultBlock(document.querySelector('.result'))

const mainBlock = document.querySelector('#main')
const mainList = document.querySelectorAll('.main-list__item')
const manual = document.querySelector('.manual')
const closeBtns = document.querySelectorAll('.close-form')


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

function getReadyToEditElement(block, form, url, item) {
    return request(url, 'POST', {id: item.getAttribute('data-id')}).then(result => {
        if (result.status == 'OK') {
            resultBlock.setSuccessfulResultStatus(result.msg)
            showBlock(block)
            form.setAttribute('data-itemId', item.getAttribute('data-id'));
            return result;
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
    })
}

async function prepareItemsForEdit(url) {
    manual.textContent = 'Нажмите на строку, которую хотите изменить';
    await getItemsFromDB(url)
    document.querySelectorAll('tr.list-row').forEach(row => {
        row.classList.add('editing')
    })
}

function prepareItemsForDeletion(urlForGetElem, urlForDeleteElem) {
    manual.textContent = "Нажмите на элемент, чтобы удалить его"
    getItemsFromDB(urlForGetElem).then(() => {
        document.querySelectorAll('tr.list-row').forEach(row => {
            row.classList.add('delete')
            row.addEventListener('click', async () => {
                row.remove()
                const data = {}
                const beingDeletedRow = row.querySelectorAll('.item')
                beingDeletedRow.forEach((item, i) => {
                    data[i] = item.textContent;
                })
                await deleteItemInDB(urlForDeleteElem, data)
            })
        })
    })
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

async function createItemInDB(url, data) {
    resultBlock.setSendingStatus()
    await updateItemInDB({url, method: 'POST', data})
}

async function editItemInDB(url, data) {
    resultBlock.setSendingStatus()
    await updateItemInDB({url, method: 'PUT', data})
}

async function deleteItemInDB(url, data) {
    resultBlock.setDeletingStatus()
    await updateItemInDB({url, method: 'DELETE', data})
}

function updateItemInDB({url, method, data}) {
    return request(url, method, data).then(result => {
        if (result.status == "OK") {
            resultBlock.setSuccessfulResultStatus(result.msg)
            return result;
        } else {
            resultBlock.setErrorStatus(result.msg)
        }
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

function printItems(result) {
    document.querySelector('.list-title').textContent = result.title;

    const list = mainBlock.querySelector('.list')
    const listRowTitle = document.createElement('tr')
    listRowTitle.classList.add('list-row-title')
    list.appendChild(listRowTitle)

    const keys = Object.keys(result.elements[0])

    keys.forEach(key => {
        listRowTitle.insertAdjacentHTML("beforeEnd", `<th class="title" data-id="">${key}</th>`)
    })

    result.elements.forEach(element => {
        const listRow = document.createElement('tr')
        listRow.classList.add('list-row')
        listRow.setAttribute("data-id", `${Object.values(element)[0]}`)

        list.appendChild(listRow)

        Object.values(element).forEach(val => {
            listRow.insertAdjacentHTML("beforeEnd", `<td class="item">${val}</td>`)
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

function showSublist() {
    mainList.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-list__item-link')) {
                item.querySelector('.sublist').classList.toggle('none');
            }
        })
    })
}

function closeBlock() {
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.parentNode.classList.add('none')
            if (item.parentNode.querySelector('ul')) {
                item.parentNode.querySelector('ul').innerHTML = ''
            }
            resultBlock.setContent('')
            manual.textContent = ''
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
    prepareItemsForEdit,
    getItemsFromDB,
    deleteItemInDB,
    prepareItemsForDeletion,
    getReadyToEditElement
}

