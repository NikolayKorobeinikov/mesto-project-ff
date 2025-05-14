import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placeList = document.querySelector(".places__list");

// Функция создания карточки

function createCard(title, imageUrl, deleteCard) {
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

// Функция удаления карточки

function removeCard(cardCopy) {
  cardCopy.remove();
  cardCopy.innerHTML = "";
}

// Вывести карточки на страницу

function renderTemplate() {
  initialCards.forEach((element) => {
    const nameCard = element.name;
    const linkCard = element.link;

    const card = createCard(nameCard, linkCard, removeCard);
    placeList.appendChild(card);
  });
}
renderTemplate();

// открываем и закрываем popup с *редактировать профиль*

const editButton = document.querySelector(".profile__edit-button");
const closeEditPopupWindow = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

editButton.addEventListener("click", function () {
  popup.classList.add("popup_is-opened");
});

closeEditPopupWindow.addEventListener("click", function () {
  popup.classList.remove("popup_is-opened");
});

// Добавление текста в input

const editFormProfile = document.forms["edit-profile"];
const editFormProfileName = editFormProfile.elements.name;
const editFormProfileDescription = editFormProfile.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
editFormProfileName.value = profileName.textContent;
editFormProfileDescription.value = profileDescription.textContent;


