import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(title, imageUrl, deleteCard, isLiked) {
  const cardCopy = cardTemplate.cloneNode(true);
  const card = cardCopy.querySelector(".card");
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");

  cardTitle.textContent = title;
  cardImage.src = imageUrl;
  cardImage.alt = title;

  deleteButton.addEventListener("click", () => deleteCard(card));

  return cardCopy;
}

// @todo: Функция удаления карточки

function removeCard(cardCopy) {
  cardCopy.remove();
  cardCopy.innerHTML = "";
}

// @todo: Вывести карточки на страницу

function renderTemplate() {
  initialCards.forEach((element) => {
    const nameCard = element.name;
    const linkCard = element.link;

    const card = createCard(nameCard, linkCard, removeCard);
    placeList.appendChild(card);
  });
}
renderTemplate();

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupRemove = document.querySelectorAll(".popup");
const image = document.querySelectorAll(".card__image");
const popupImage = document.querySelector(".popup__image");
// const popupTitle = document.querySelector('.popup__caption');

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});
addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

image.forEach((image) => {
  image.addEventListener("click", function () {
    const imageSrc = image.src;
    popupImage.src = imageSrc;
    openPopup(popupTypeImage);
  });
});



closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    popupRemove.forEach((popup) => {
      closePopup(popup);
    });
  });
});

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_is-opened");
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

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


const likeButton = document.querySelectorAll(".card__like-button");

function isLiked() {
  likeButton.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("card__like-button_is-active");
    });
  });
}
isLiked();
