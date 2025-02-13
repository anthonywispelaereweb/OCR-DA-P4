// DOM Elements
const modalbg = document.querySelector('.bground'),
  formHTML = document.querySelector('.modal-body form'),
  modalBtn = document.querySelectorAll('.modal-btn'),
  formDataHTML = document.querySelectorAll('.formData'),
  modalBody = document.querySelector('.modal-body'),
  closeBtn = document.querySelectorAll('.close'),
  navBarBtn = document.querySelector('.navbar-js'),
  firstInput = document.querySelector('#first'),
  lastInput = document.querySelector('#last'),
  emailInput = document.querySelector('#email'),
  birthdateInput = document.querySelector('#birthdate'),
  quantityInput = document.querySelector('#quantity'),
  location1Input = document.querySelector('#location1'),
  location2Input = document.querySelector('#location2'),
  location3Input = document.querySelector('#location3'),
  location4Input = document.querySelector('#location4'),
  location5Input = document.querySelector('#location5'),
  location6Input = document.querySelector('#location6'),
  accepCGVInput = document.querySelector('#accepCGV')

// Add the max value for the birthdate input
const initMaxValueBirthDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const maxDate = `${year}-${month}-${day}`
  const birthdate = document.querySelector('#birthdate')
  birthdate.setAttribute('max', maxDate)
  return maxDate
}

const globalData = {
  maxBirthdate: initMaxValueBirthDate()
}

const editNav = () => {
  let x = document.getElementById('myTopnav')
  x.classList.toggle('responsive')
}
// launch modal form
const launchModal = () => {
  modalbg.classList.add('show')
  const allHideElements = document.querySelectorAll('.hide')
  const btnCloseJs = document.querySelector('.btn-close-js')
  const succcesMessage = document.querySelector('.success-message')
  if (succcesMessage) succcesMessage.remove()
  if (btnCloseJs) btnCloseJs.remove()
  allHideElements.forEach(el => {
    el.classList.remove('hide')
  })
  firstInput.focus()
}

// close modal form
const closeModal = () => {
  modalbg.classList.remove('show')
  modalbg.classList.add('hide')
  // Clear success-message if exist
  const successMessageHTML = document.querySelector('.success-message')
  if (successMessageHTML) successMessageHTML.remove()
  // Reset Form
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
modalBody.addEventListener('click', ev => {
  ev.stopPropagation()
})

// Method to set or remove a error message
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
        el.dataset.error = 'Veuillez entrer un nombre positif ou 0.'
        break
      case 'location1':
        el.dataset.error = 'Vous devez choisir une ville.'
        break
      case 'accepCGV':
        el.dataset.error = 'Vous devez vérifier que vous acceptez les termes et conditions.'
        break
    }
  } else {
    el.dataset.error = ''
  }
}

const validateInput = (input, data) => {
  // manage empty input
  if (input.value.trim() === '') {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
  }
  // manage text input
  if (input.type === 'text' && (input.name === 'first' || input.name === 'last')) {
    return validateTextInput(input, data)
  }
  // manage date input
  if (input.type === 'date' && input.name === 'birthdate') {
    return validateDateInput(input, data)
  }
  // manage email input
  if (input.type === 'email' && input.name === 'email') {
    return validateEmailInput(input, data)
  }
  // manage radio input
  if (input.type === 'radio' && input.name === 'location') {
    return validateRadioInput(input, data)
  }
  // manage checkbox input
  if (input.type === 'checkbox') {
    return validateCheckboxInput(input, data)
  }
  // manage number input
  if (input.type === 'number') {
    return validateNumberInput(input, data)
  }

  return true
}

// Method to check all values in form
const checkFormValid = () => {
  let isValid = true
  formDataHTML.forEach(data => {
    const input = data.querySelector('input')
    if (!validateInput(input, data)) {
      isValid = false
    }
    displayErrorMessage(data, input, data.dataset.errorVisible)
  })
  return isValid
}

// Method to check email input
const validateEmail = email => {
  // Regex details https://regexr.com/8autj
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

// Method to check text input
const validateTextInput = (input, data) => {
  if (input.value.length < 2) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Method to check date input
const validateDateInput = (input, data) => {
  const date = new Date(input.value)
  const dateNow = new Date()
  if (date > dateNow) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Method to check email input
const validateEmailInput = (input, data) => {
  if (!validateEmail(input.value.trim())) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Method to check radio input
const validateRadioInput = (input, data) => {
  const radioName = input.getAttribute('name')
  const radioChecked = document.querySelector(`input[name="${radioName}"]:checked`)
  if (!radioChecked) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Method to check checkbox input
const validateCheckboxInput = (input, data) => {
  if (!input.checked) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Method to check number input
const validateNumberInput = (input, data) => {
  if (!input.value || Number(input.value) < 0) {
    data.dataset.errorVisible = true
    return false
  } else {
    data.dataset.errorVisible = false
    return true
  }
}

// Init array for all elements with eventlistener input
const inputTextElements = [
  {
    elementHTML: firstInput,
    method: validateTextInput
  },
  {
    elementHTML: lastInput,
    method: validateTextInput
  },
  {
    elementHTML: emailInput,
    method: validateEmailInput
  },
  {
    elementHTML: birthdateInput,
    method: validateDateInput
  },
  {
    elementHTML: quantityInput,
    method: validateNumberInput
  },
  {
    elementHTML: location1Input,
    method: validateRadioInput
  },
  {
    elementHTML: location2Input,
    method: validateRadioInput
  },
  {
    elementHTML: location3Input,
    method: validateRadioInput
  },
  {
    elementHTML: location4Input,
    method: validateRadioInput
  },
  {
    elementHTML: location5Input,
    method: validateRadioInput
  },
  {
    elementHTML: location6Input,
    method: validateRadioInput
  },
  {
    elementHTML: accepCGVInput,
    method: validateCheckboxInput
  }
]

// Init event input for each element form
inputTextElements.forEach(inputElement => {
  inputElement.elementHTML.addEventListener('input', e => {
    if (inputElement.method(e.target, e.target.parentNode)) {
      displayErrorMessage(e.target.parentNode, e.target, e.target.parentNode.dataset.errorVisible)
    }
  })
})

// Method to send data
const postInfo = async () => {
  const formData = new FormData(formHTML)
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const urlApi = `https://restapi.fr/api/OCR-test-tonio-${globalData.maxBirthdate}`
  const response = await fetch(urlApi, options)
  if (response.ok) {
    let result = await response.json()
    if (result) {
      displaySuccessMessage(`<p>Merci ! Votre réservation a été reçue. Consultable <a href="${urlApi}" target="_blank" rel="noopener noreferrer">ici</a><p>`)
    }
  }
}

// Method to display a success message in modal
const displaySuccessMessage = message => {
  const hideElements = ['.formData', '.text-label', '.btn-submit']
  hideElements.forEach(el => {
    const els = document.querySelectorAll(el)
    els.forEach(el => {
      el.classList.add('hide')
    })
  })
  const successMessage = document.createElement('div')
  successMessage.innerHTML = message ?? `Merci ! Votre réservation a été reçue.`
  successMessage.classList.add('success-message')

  const inputClose = document.createElement('input')
  inputClose.setAttribute('type', 'button')
  inputClose.className = 'btn-submit btn-button btn-close-js'
  inputClose.value = 'Fermer'
  inputClose.addEventListener('click', () => {
    closeModal()
  })

  formDataHTML.forEach(data => {
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
