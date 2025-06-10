import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard, handleLike } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "./components/modals.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const editButton = document.querySelector(".profile__edit-button");
const closeButtonList = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupsList = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const placeList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");

function renderTemplate() {
  initialCards.forEach((element) => {
    const nameCard = element.name;
    const linkCard = element.link;
    const card = createCard(
      nameCard,
      linkCard,
      removeCard,
      handleLike,
      showImagePopup
    );
    placeList.appendChild(card);
  });
}

function showImagePopup(title, imageUrl) {
  const popupImageElement = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImageElement.src = imageUrl;
  popupImageElement.alt = title;
  popupCaption.textContent = title;
  openPopup(popupTypeImage);
}

renderTemplate();

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openPopup(popupNewCard);
});

closeButtonList.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});

popupsList.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
  popup.classList.add("popup_is-animated");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closePopup(popupEdit);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardForm = document.forms["new-place"];
cardForm.addEventListener("submit", addCardByInputData);

const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardUrl = document.querySelector(".popup__input_type_url");

function addCardByInputData(evt) {
  evt.preventDefault();
  const newCardName = inputCardName.value;
  const newCardUrl = inputCardUrl.value;
  const newCardEdit = createCard(
    newCardName,
    newCardUrl,
    removeCard,
    handleLike,
    showImagePopup
  );
  placeList.prepend(newCardEdit);
  evt.target.reset();
  closePopup(popupNewCard);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
