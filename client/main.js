const mainList = document.querySelectorAll('.main-list__item')
const createOrderBtn = document.querySelector('.create-order__item')
const createFilmBtn = document.querySelector('.create-film__item')
const createGenreBtn = document.querySelector('.create-genre__item')
const closeBtns = document.querySelectorAll('.close-form')
function showSublist() {
    mainList.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-list__item-link')) {
                item.querySelector('.sublist').classList.toggle('none');
            }
        })
    })
}
function showForm(listItem, form) {
    listItem.addEventListener('click', () => {
        document.querySelector(form).classList.remove('none');
    })
}
function closeForm() {
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.classList.add('none');
        })
    })
}

showSublist()
closeForm() 
showForm(createOrderBtn, '.create-order')
showForm(createFilmBtn, '.create-film')
showForm(createGenreBtn, '.create-genre')
