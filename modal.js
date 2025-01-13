const editNav = () => {
  let x = document.getElementById('myTopnav')
  x.classList.toggle('responsive')
}
// Add the max value for the birthdate input
const initMaxValueBirthDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const maxDate = `${year}-${month}-${day}` 
  const birthdate = document.querySelector('#birthdate')
  birthdate.setAttribute('max', maxDate)
  console.log("🚀 ~ initMaxValueBirthDate ~ maxDate:", maxDate)
  return maxDate
}
// initMaxValueBirthDate()
// DOM Elements
const modalbg = document.querySelector('.bground'),
  formHTML = document.querySelector('.modal-body form'),
  modalBtn = document.querySelectorAll('.modal-btn'),
  formData = document.querySelectorAll('.formData'),
  modalBody = document.querySelectorAll('.modal-body'),
  closeBtn = document.querySelectorAll('.close'),
  navBarBtn = document.querySelector('.navbar-js'),
  firstInput = document.querySelector('#first');

const globalData = {
  maxBirthdate: initMaxValueBirthDate(),
}

// globalData.maxBirthdate = new Date().toISOString().split('T')[0]
// launch modal form
const launchModal = () => {
  modalbg.classList.add('show')
  const allHideElements = document.querySelectorAll('.hide')
  const btnCloseJs = document.querySelector('.btn-close-js')
  const succcesMessage = document.querySelector('.success-message')
  if (succcesMessage) succcesMessage.remove()
  if (btnCloseJs) btnCloseJs.remove()
  console.log("🚀 ~ launchModal ~ succcesMessage:", succcesMessage)
  allHideElements.forEach(el => {
    el.classList.remove('hide')
  })
  firstInput.focus()
}
// close modal form
const closeModal = () => {
  modalbg.classList.remove('show')
  modalbg.classList.add('hide')
  formHTML.reset()
}
// navar event responsive
navBarBtn.addEventListener('click', () => {
  editNav()
})
// modal and form events
modalBtn.forEach(btn => btn.addEventListener('click', () => launchModal()))
closeBtn.forEach(btn => btn.addEventListener('click', () => closeModal()))
modalbg.addEventListener('click', () => closeModal())
modalBody.forEach(btn =>
  btn.addEventListener('click', ev => {
    ev.stopPropagation()
  })
)

const displayErrorMessage = (el, input, isError) => {
  let idCase = input.getAttribute('id') || input.getAttribute('name')
  if (isError) {
    switch (idCase) {
      case 'first':
        el.dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.'
        break
      case 'last':
        el.dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
        break
      case 'email':
        el.dataset.error = 'Veuillez entrer une adresse email valide.'
        break
      case 'birthdate':
        el.dataset.error = 'Vous devez entrer votre date de naissance.'
        break
      case 'quantity':
        el.dataset.error = 'Veuillez entrer un nombre.'
        break
      case 'location1':
        el.dataset.error = 'Vous devez choisir une ville.'
        break
      case 'checkbox1':
        el.dataset.error = 'Vous devez vérifier que vous acceptez les termes et conditions.'
        break
    }
  } else {
    el.dataset.error = ''
  }
}
const validateEmail = (email) => {
  // https://regexr.com/8autj
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const checkFormValid = () => {
  let isValid = true
  formData.forEach(data => {
    const input = data.querySelector('input')
    // manage empty input
    if (input.value.trim() === '') {
      data.dataset.errorVisible = true
      isValid = false
    } else {
      data.dataset.errorVisible = false
    }
    // manage date input
    if (input.type === 'date' && input.name === 'birthdate') {
      const date = new Date(input.value)
      const dateNow = new Date()
      if (date > dateNow) {
        isValid = false
        data.dataset.errorVisible = true
      } else {
        data.dataset.errorVisible = false
      }
    }
    // manage email input
    if (input.type === 'email' && input.name === 'email') {
      if (!validateEmail(input.value)) {
        isValid = false
        data.dataset.errorVisible = true
      } else {
        data.dataset.errorVisible = false
      }
    }

    // manage radio input
    if (input.type === 'radio' && input.name === 'location') {
      const radioName = input.getAttribute('name')
      const radioChecked = document.querySelector(`input[name="${radioName}"]:checked`)
      if (!radioChecked) {
        isValid = false
        data.dataset.errorVisible = true
      } else {
        data.dataset.errorVisible = false
      }
    }

    // manage checkbox input
    if (input.type === 'checkbox') {
      if (!input.checked) {
        isValid = false
        data.dataset.errorVisible = true
      } else {
        data.dataset.errorVisible = false
      }
    }
    // display error message or not
    displayErrorMessage(data, input, data.dataset.errorVisible)
  })
  return isValid
}
const postInfo = async() => {
  const formData = new FormData(formHTML)
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  }) 
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(`https://restapi.fr/api/OCR-test-tonio-${globalData.maxBirthdate}`, options)
  if (response.ok) {
    console.log('🚀 ~ postInfo ~ response:', response)
    displaySuccessMessage()
  }
}

const displaySuccessMessage = () => {
  const hideElements = ['.formData', '.text-label', '.btn-submit']
  hideElements.forEach(el => {
    const els = document.querySelectorAll(el)
    els.forEach(el => {
      el.classList.add('hide')
    })
  })
  const successMessage = document.createElement('div')
  successMessage.textContent = `Merci ! Votre réservation a été reçue.`
  successMessage.classList.add('success-message')

  const inputClose = document.createElement('input')
  inputClose.setAttribute('type', 'button')
  inputClose.className = 'btn-submit btn-button btn-close-js'
  inputClose.value = 'Fermer'
  inputClose.addEventListener('click', () => {
    closeModal()
  })

  formData.forEach(data => {
    data.classList.add('hide')
  })
  formHTML.appendChild(successMessage)
  formHTML.appendChild(inputClose)
}

formHTML.addEventListener('submit', e => {
  e.preventDefault()
  const isValid = checkFormValid()
  if (isValid) {
    postInfo()
  }
})