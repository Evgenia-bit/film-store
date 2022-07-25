import {createItemInDB, getElementsForSelect, showBlock} from "./main.js";

const createReportRevenueBtn = document.querySelector('.create-report-about-revenue_li')
const createReportRevenue = document.querySelector('#revenue-form')
const createReportEmployee = document.querySelector('#employee-form')
const createReportEmployeeRevenueBtn = document.querySelector('.create-report-about-employee_li')
const reportRevenue = document.querySelector('.report-revenue')
const reportEmployee = document.querySelector('.report-employee')
const selectEmployeeForReport = document.querySelector('#employee-for-report')


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


