import "../pages/index.css";
// import { initialCards } from "../scripts/cards.js";
import {renderTemplate, addCardByInputData} from "../components/card.js";


// const cardTemplate = document.querySelector("#card-template").content;
// const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const image = document.querySelectorAll(".card__image");
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector('.popup__caption');

// Функция создания карточки

// function createCard(title, imageUrl, deleteCard, handleLike) {
//   const cardCopy = cardTemplate.cloneNode(true);
//   const card = cardCopy.querySelector(".card");
//   const cardImage = cardCopy.querySelector(".card__image");
//   const cardTitle = cardCopy.querySelector(".card__title");
//   const deleteButton = cardCopy.querySelector(".card__delete-button");
//   const likeButton = cardCopy.querySelector(".card__like-button");

//   cardTitle.textContent = title;
//   cardImage.src = imageUrl;
//   cardImage.alt = title;

//   deleteButton.addEventListener("click", () => deleteCard(card));
//   likeButton.addEventListener("click", () => handleLike(likeButton));
  
//   return cardCopy;
// }

renderTemplate();
// Лайк карточки

// function handleLike(likeBtn) {
//   likeBtn.classList.toggle("card__like-button_is-active");
// }

// Функция удаления карточки

// function removeCard(cardCopy) {
//   cardCopy.remove();
//   cardCopy.innerHTML = "";
// }

// Вывести карточки на страницу

// function renderTemplate() {
//   initialCards.forEach((element) => {
//     const nameCard = element.name;
//     const linkCard = element.link;

//     const card = createCard(nameCard, linkCard, removeCard, handleLike);
//     placeList.appendChild(card);
//   });
// }
// renderTemplate();




// События открытия и закрытия модальных окон

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

image.forEach((image) => {
  image.addEventListener("click", function () {
    const imageSrc = image.src;
    const imageAlt = image.alt;
    popupImage.src = imageSrc;
    popupTitle.textContent = imageAlt;
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

// Функция открытия модального окна

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

// Функция закрытия попапа кликом на 'Х'

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_is-opened");
}

// Функция закрытия попапа нажатием на Esc

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

// Функция закрытия попапа кликом на оверлей

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
});

// Плавное открытие и закрытие попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Работа с формой профиля

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

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

const cardForm = document.forms['new-place'];
// const inputCardName = document.querySelector('.popup__input_type_card-name');
// const inputCardUrl = document.querySelector('.popup__input_type_url');


// function addCardByInputData(evt) {
//   evt.preventDefault();
//   const newCardName = inputCardName.value;
//   const newCardUrl = inputCardUrl.value;
//   const newCardEdit = createCard(newCardName, newCardUrl, removeCard, handleLike);
//   placeList.appendChild(newCardEdit);
//   closePopup(popupNewCard);
// }
cardForm.addEventListener('submit', addCardByInputData)

// cardForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const newCardName = inputCardName.value;
//   const newCardUrl = inputCardUrl.value;
//   const card = {
//     name: newCardName,
//     link: newCardUrl,
//   }
//   const newCardEdit = createCard(card.name, card.link, removeCard, handleLike);
//   placeList.appendChild(newCardEdit);
//   closePopup(popupNewCard);
// });