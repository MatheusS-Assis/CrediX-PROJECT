(() => {
  'use strict'

  const form = document.querySelector('.needs-validation')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirmPassword')
  const cpfInput = document.getElementById('cpf')

  form.addEventListener('submit', event => {

    const isCpfValid = validarCPF(cpfInput.value);
    if (!isCpfValid) {
      cpfInput.setCustomValidity("Inválido");
    } else {
      cpfInput.setCustomValidity("");
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("As senhas não coincidem");
    } else {
      confirmPassword.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)

  confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value === password.value) {
      confirmPassword.setCustomValidity("");
    }
  });

  cpfInput.addEventListener('input', () => {
    cpfInput.setCustomValidity("");
  });
})()


function togglePassword(id, el) {
  const input = document.getElementById(id);
  const icon = el.querySelector("i");
  input.type = input.type === "password" ? "text" : "password";
  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash");
}

function maskCPF(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = value;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}