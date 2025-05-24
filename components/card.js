import { initialCards } from "../scripts/cards.js";
import { closePopup } from "../components/modals.js";

const cardTemplate = document.querySelector("#card-template").content;
const placeList = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");

export function createCard(title, imageUrl, deleteCard, handleLike) {
  const cardCopy = cardTemplate.cloneNode(true);
  const card = cardCopy.querySelector(".card");
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");
  const likeButton = cardCopy.querySelector(".card__like-button");

  cardTitle.textContent = title;
  cardImage.src = imageUrl;
  cardImage.alt = title;

  deleteButton.addEventListener("click", () => deleteCard(card));
  likeButton.addEventListener("click", () => handleLike(likeButton));

  return cardCopy;
}

function removeCard(cardCopy) {
  cardCopy.remove();
  cardCopy.innerHTML = "";
}

function handleLike(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

export function renderTemplate() {
  initialCards.forEach((element) => {
    const nameCard = element.name;
    const linkCard = element.link;
    const card = createCard(nameCard, linkCard, removeCard, handleLike);
    placeList.appendChild(card);
  });
}

const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardUrl = document.querySelector(".popup__input_type_url");

export function addCardByInputData(evt) {
  evt.preventDefault();
  const newCardName = inputCardName.value;
  const newCardUrl = inputCardUrl.value;
  const newCardEdit = createCard(
    newCardName,
    newCardUrl,
    removeCard,
    handleLike
  );
  placeList.prepend(newCardEdit);
  evt.target.reset();
  closePopup(popupNewCard);
}
