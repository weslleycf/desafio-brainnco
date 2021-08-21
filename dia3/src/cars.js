const form = document.querySelector('[data-js="cars-form"]');
const table = document.querySelector('[data-js="table"]');
const inputs = ['image','brand-model', 'year', 'plate', 'color'];
const data = {};



form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const tableRow = document.createElement('tr');
    inputs.forEach((elementName)=>{
       data[elementName] = e.target.elements[elementName].value
    })

    createRow(data, tableRow);
    table.appendChild(tableRow)
    form.reset();
    e.target.elements['image'].focus();
})

function createRow(data, tableRow){
    
    for (const key in data){
        const td = document.createElement('td');
        td.innerText = data[key];
        tableRow.appendChild(td);
    }
}



