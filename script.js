const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const message = document.getElementById('message');
const button = document.getElementById('submitBtn');
const charsLeft = document.getElementById('charsLeft');
const successMessage = document.getElementById('successMessage');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]+$/;
  return re.test(phone);
}

function validateName(name) {
  const re = /^[a-zA-Z]+$/;
  return re.test(name);
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function updateCharsLeft() {
  const maxLength = message.getAttribute('maxlength');
  const currentLength = message.value.length;
  const charsLeftNum = maxLength - currentLength;
  charsLeft.innerHTML = charsLeftNum;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  if (firstName.value.trim() === '' || !validateName(firstName.value)) {
    setErrorFor(firstName, 'Primeiro nome deve ter pelo menos 3 letras');
    isValid = false;
  } else {
    setSuccessFor(firstName);
  }

  if (lastName.value.trim() === '' || !validateName(lastName.value)) {
    setErrorFor(lastName, 'Sobrenome deve ter pelo menos 3 letras');
    isValid = false;
  } else {
    setSuccessFor(lastName);
  }

  if (phone.value.trim() === '') {
    setErrorFor(phone, 'Telefone é obrigatório');
    isValid = false;
  } else if (!validatePhone(phone.value.trim())) {
    setErrorFor(phone, 'Telefone deve conter somente números');
    isValid = false;
  } else {
    setSuccessFor(phone);
  }

  if (email.value.trim() === '') {
    setErrorFor(email, 'E-mail é obrigatório');
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    setErrorFor(email, 'E-mail inválido');
    isValid = false;
  } else {
    setSuccessFor(email);
  }

  if (message.value.trim() === '') {
    setErrorFor(message, 'Mensagem é obrigatória');
    isValid = false;
  } else {
    setSuccessFor(message);
  }

  if (isValid) {
    button.classList.add('btn-success');
    button.disabled = true;
    setTimeout(() => {
      button.classList.remove('btn-success');
      button.disabled = false;
      form.reset();
      setSuccessFor(firstName);
      setSuccessFor(lastName);
      setSuccessFor(phone);
      setSuccessFor(email);
      setSuccessFor(message);
      successMessage.style.display = 'block';
      message.dispatchEvent(new Event('input')); // adicionado para atualizar o contador de caracteres
    }, 1500);
  }
});

message.addEventListener('input', () => {
  updateCharsLeft();
});
