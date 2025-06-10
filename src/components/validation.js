export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function checkInputValidity(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const urlRegex =
    /^(https?:\/\/)([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

  if (input.validity.valueMissing) {
    showInputError(input, "Вы пропустили это поле", errorElement, config);
  } else if (input.type === "url" && !urlRegex.test(input.value.trim())) {
    showInputError(input, "Введите адрес сайта", errorElement, config);
  } else if (
    input.dataset.type === "text" &&
    !nameRegex.test(input.value.trim())
  ) {
    showInputError(input, input.dataset.errorMessage, errorElement, config);
  } else if (!input.validity.valid) {
    showInputError(input, input.validationMessage, errorElement, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, message, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(config.inactiveButtonClass, !isValid);
}

export function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(Array.from(inputs), button, config);
}
