const form = document.querySelector('[data-js="cars-form"]');
const table = document.querySelector('[data-js="table"]');
const inputs = ['image','brandModel', 'year', 'plate', 'color'];
const data = {};
const url = 'http://localhost:3333/cars';
const responseData = [];

function showError(msg){
    const error = document.createElement('span');
    error.className = 'error';
    error.textContent = `${msg}`;
    form.appendChild(error);
}


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
    if (document.querySelector('.error')){
        document.querySelector('.error').remove();
    }
    if (document.querySelector('[data-js="error-row"')){
        document.querySelector('[data-js="error-row"').remove();
    }
    const tableRow = document.createElement('tr');
    inputs.forEach((elementName)=>{
       data[elementName] = e.target.elements[elementName].value
    })


    const result = await fetch(url, {
        method: 'POST',
        headers:{
            'content-type':'application/json',
        }, body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(e => ({error:true, message: e.message}))

    if (result.error){
        showError(result.message);
        return
    }
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
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-js','delete-car');
    deleteButton.setAttribute('onclick','deleteCar()');
    deleteButton.dataset.plate = data['plate'];
    deleteButton.innerText = 'Excluir';
    deleteButton.addEventListener('click', handleDelete);
    const del = document.createElement('td');
    del.appendChild(deleteButton);
    tr.appendChild(del);
    tr.dataset.plate = data['plate'];
    table.appendChild(tr);
       
    
}

async function handleDelete(e){
    const button = e.target
    const plate = e.target.dataset.plate;
    const tr = document.querySelector(`tr[data-plate="${plate}"]`);
    const result = await fetch(url, {
        method: 'DELETE',
        headers:{
            'content-type':'application/json',
        }, body: JSON.stringify({'plate': plate} )
    })
    .then(response => response.json())
    .catch(e => ({error:true, message: e.message}))

    if (result.error){
        showError(result.message);
        return
    }


    table.removeChild(tr);  
    button.removeEventListener('click', handleDelete)
    main();

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
