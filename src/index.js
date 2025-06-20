import "./pages/index.css";
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
  updateAvatar,
} from './components/api.js';

const avatarEditButton = document.querySelector(".profile__image-edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('form[name="update-avatar"]');
const avatarInput = avatarForm.querySelector('input[name="avatar-link"]');

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtonList = document.querySelectorAll(".popup__close");
const popupsList = document.querySelectorAll(".popup");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

const cardForm = document.forms["new-place"];
const inputCardName = cardForm.querySelector(".popup__input_type_card-name");
const inputCardUrl = cardForm.querySelector(".popup__input_type_url");

const profileImage = document.querySelector(".profile__image");

const placeList = document.querySelector(".places__list");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    renderCards(cards);
  })
  .catch((err) => {
    console.error("Ошибка при инициализации страницы:", err);
  });

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
      userId
    );
    placeList.append(card);
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

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  if (!buttonElement) return;
  buttonElement.textContent = isLoading ? "Сохранение..." : defaultText;
}

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
    if (popup) closePopup(popup);
  });
});

popupsList.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
  popup.classList.add("popup_is-animated");
});

profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const button = profileFormElement.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, button);

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
    })
    .finally(() => {
      renderLoading(false, button);
    });
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const button = cardForm.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, button);

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
        cardData.likes,
        cardData.owner._id,
        userId
      );
      placeList.prepend(newCard);
      cardForm.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
});

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
});

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const button = avatarForm.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, button);

  updateAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      avatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
});

enableValidation(validationConfig);
