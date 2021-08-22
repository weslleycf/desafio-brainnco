const form = document.querySelector('[data-js="cars-form"]');
const table = document.querySelector('[data-js="table"]');
const inputs = ['image','brandModel', 'year', 'plate', 'color'];
const data = {};
const url = 'http://localhost:3333/cars';
const responseData = [];

const errorMsgRow = (msg) =>{
    table.innerHTML = '';
    const tr = document.createElement('tr');
    tr.setAttribute('data-js','error-row');
    const td = document.createElement('td');
    td.setAttribute('colspan','5');
    td.innerText = msg;
    tr.appendChild(td);
    table.appendChild(tr);
}   
    

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    if (document.querySelector('[data-js="error-row"')){
        document.querySelector('[data-js="error-row"').remove();
    }
    const tableRow = document.createElement('tr');
    inputs.forEach((elementName)=>{
       data[elementName] = e.target.elements[elementName].value
    })

        createRow(data);
       
        form.reset();
        e.target.elements['image'].focus();   
    }
)

function createRow(data){
    const tr = document.createElement('tr');
    for (const key in data){

        const td = document.createElement('td');
        
            td.innerText = data[key];
            tr.appendChild(td);
        
    }
    table.appendChild(tr)
}

  
async function main(){
    const result = await fetch(url)
    .then(response => response.json())
    .catch(e => ({error:true, message: e.message}))


   if (result.error){
       console.log('Erro ao buscar carros', result.message)
       return
   }
   if (result.length == 0){
    errorMsgRow('Nenhum carro foi encontrado.')
   } else {
   result.forEach(car =>{
    createRow(car);
   })}

}
 
main();
