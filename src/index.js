import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard, handleLike } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "./components/modals.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
} from './components/api.js';

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

function renderCards(cards) {
  cards.forEach((cardData) => {
    const card = createCard(
      cardData.name,
      cardData.link,
      removeCard,
      handleLike,
      showImagePopup,
      cardData._id,
      cardData.likes,
      cardData.owner._id,
    );
    placeList.append(card);
  });
}

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    renderCards(cards);
  })
  .catch((err) => {
    console.error("Ошибка при инициализации страницы:", err);
  });

function renderTemplate() {
  initialCards.forEach((element) => {
    const nameCard = element.name;
    const linkCard = element.link;
    const card = createCard(
      nameCard,
      linkCard,
      removeCard,
      handleLike,
      showImagePopup,
      element._id || '',
      element.likes || [],
      element.owner?._id || '',
      userId
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

  updateUserInfo(newName, newJob)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
    });
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
  addNewCard(newCardName, newCardUrl)
    .then((cardData) => {
      const newCard = createCard(
        cardData.name,
        cardData.link,
        removeCard,
        handleLike,
        showImagePopup,
        cardData._id,
        cardData.likes
      );
      placeList.prepend(newCard);
      evt.target.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
    });
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