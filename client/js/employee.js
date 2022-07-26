import {getElementsForSelect, request} from "./main.js";

const changeEmployee = document.querySelector('.change-employee')
const changeEmployeeForm = document.querySelector('.choose-employee-form')
const selectEmployee = document.querySelector('#employee')
const currentEmployee = document.querySelector('.current-employee')
const changeEmployeeSubmit = document.querySelector('.change-employee-submit')





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