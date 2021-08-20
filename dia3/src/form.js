

const nome = document.querySelector('[data-js="name"]');
nome.addEventListener('input', (e)=>{
    e.preventDefault();
    //const inputValue = e.target.value;
    const wordList = e.target.value.split(' ');
    const prepositions = ["de", "da", "do","dos"]

    const updatedWordList = wordList.map((word) => prepositions.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
    e.target.value = updatedWordList.join(" ");
})

// Dia 3 - Exercicio 2

const form = document.querySelector('[data-js="form"]');
const select = document.createElement('select');
const colorsContainer = document.createElement('div');

colorsContainer.style.display = 'flex';
select.setAttribute('multiple', '');
form.appendChild(select);
const colors = {
    "azul": "#1a27b8",
    "roxo":"#7b0299",
    "verde": "#02cc20",
    "vermelho": "#e31305",
    "amarelo": "#e7ff0a"

}

for (const color in colors){
    const option = document.createElement('option');
    option.value = colors[color];
    option.textContent = color;
    select.appendChild(option);
}

form.appendChild(colorsContainer);


select.addEventListener('change', (e)=>{
    colorsContainer.innerHTML = '';
    
    Array.from(e.target.selectedOptions).forEach((option)=>{
        const colorBox = document.createElement('div');
        colorBox.style.height = '100px';
        colorBox.style.width = '100px';
        colorBox.style.background = option.value;
        colorsContainer.appendChild(colorBox);
})

})








