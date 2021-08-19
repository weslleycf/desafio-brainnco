const nome = document.querySelector('[data-js="name"]');

nome.addEventListener('input', (e)=>{
    e.preventDefault();
    //const inputValue = e.target.value;
    const wordList = e.target.value.split(' ');
    const prepositions = ["de", "da", "do","dos"]

    const updatedWordList = wordList.map((word) => prepositions.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.substring(1));
    e.target.value = updatedWordList.join(" ");
})
