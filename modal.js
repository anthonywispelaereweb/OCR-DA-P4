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
formHTML.addEventListener("submit", (e) => {
  e.preventDefault();
})