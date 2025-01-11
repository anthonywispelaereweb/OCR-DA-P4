const editNav = () => {
  let x = document.getElementById("myTopnav");
  x.classList.toggle('responsive');
}

// DOM Elements
const modalbg = document.querySelector(".bground"),
      formHTML = document.querySelector(".modal-body form"),
      modalBtn = document.querySelectorAll(".modal-btn"),
      formData = document.querySelectorAll(".formData"),
      modalBody = document.querySelectorAll(".modal-body"),
      closeBtn = document.querySelectorAll(".close"),
      navBarBtn = document.querySelector(".navbar-js");


// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
}
// close modal form
const closeModal = () => {
  modalbg.style.display = "none";
  formHTML.reset();
}
// navar event responsive
navBarBtn.addEventListener("click", () => {
  editNav()
})
// modal and form events
modalBtn.forEach((btn) => btn.addEventListener("click", () => launchModal()));
closeBtn.forEach((btn) => btn.addEventListener("click", () => closeModal()));
modalbg.addEventListener("click", ()=> closeModal());
modalBody.forEach((btn) => btn.addEventListener("click", (ev) => {
  ev.stopPropagation();
}));

const displayErrorMessage = (el, input, isError) => {
  let idCase =  input.getAttribute("id") || input.getAttribute("name");
  if(isError){
    switch(idCase){    
      case "first":
        el.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        break;
      case "last":
        el.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        break;
      case "email":
        el.dataset.error = "Veuillez entrer une adresse email valide.";
        break;
      case "birthdate":
        el.dataset.error = "Vous devez entrer votre date de naissance.";
        break;
      case "quantity":
        el.dataset.error = "Veuillez entrer un nombre.";
        break;
      case "location1":
        el.dataset.error = "Vous devez choisir une ville.";
        break;
      case "checkbox1":
        el.dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions.";
        break;
    }
  } else {
    el.dataset.error = ""
  }
}

const checkFormValid = () => {
  let isValid = true;
  formData.forEach((data) => {
    const input = data.querySelector("input");
    if(input.value.trim() === ""){
      data.dataset.errorVisible = true;
      isValid = false;
    } else {
      data.dataset.errorVisible = false;
    }
    if(input.type === "radio" && input.name === "location"){
      const radioName = input.getAttribute("name");
      const radioChecked = document.querySelector(`input[name="${radioName}"]:checked`);
      if(!radioChecked){
        isValid = false;
        data.dataset.errorVisible = true;
      } else {
        data.dataset.errorVisible = false;
      }
    }
    if(input.type === "checkbox"){
      if(!input.checked){
        isValid = false;
        data.dataset.errorVisible = true;
      } else {
        data.dataset.errorVisible = false;
      }
    }
    displayErrorMessage(data, input, data.dataset.errorVisible)
  });
  return isValid;
}


formHTML.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid = checkFormValid();
  if(isValid){
    console.log("Merci pour votre inscription");
  }
})