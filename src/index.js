import "../pages/index.css";
import { renderTemplate, addCardByInputData } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modals.js";

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const image = document.querySelectorAll(".card__image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// События открытия и закрытия модальных окон
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

image.forEach((image) => {
  image.addEventListener("click", function () {
    console.log("ok");
    const imageSrc = image.src;
    const imageAlt = image.alt;
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openPopup(popupTypeImage);
  });
});

closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
});

// Плавное открытие и закрытие попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Работа с формой профиля
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closePopup(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

// Работа с формой добавления картинки
const cardForm = document.forms["new-place"];
cardForm.addEventListener("submit", addCardByInputData);

renderTemplate();
