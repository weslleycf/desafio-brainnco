import './style.css'

document.querySelector('[data-js="app"]').innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

const link = document.querySelector('[data-js="link"]');
link.addEventListener('click', (e) => {
  e.preventDefault();
  const app = document.querySelector('[data-js="app"]'); 
  if (app.getAttribute("style") === "visibility: hidden"){
    app.setAttribute("style", "visibility: visible");
    link.innerHTML = "Esconder";
  } else {
    app.setAttribute("style", "visibility: hidden");
    link.innerHTML = "Exibir";
  }
   
}
, false );

