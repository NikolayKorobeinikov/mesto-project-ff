import {deleteCard as apiDeleteCard} from './api.js';
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  title,
  imageUrl,
  deleteCard,
  handleLike,
  showImagePopup,
  cardId,
  likes,
  ownerId,
  currentUserId
) {
  const cardCopy = cardTemplate.cloneNode(true);
  const card = cardCopy.querySelector(".card");
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");
  const likeButton = cardCopy.querySelector(".card__like-button");

  cardTitle.textContent = title;
  cardImage.src = imageUrl;
  cardImage.alt = title;

  if (ownerId === currentUserId) {
    deleteButton.addEventListener("click", () => {
      if (confirm("Вы уверены, что хотите удалить карточку?")) {
        apiDeleteCard(cardId)
          .then(() => {
            deleteCardHandler(card);
          })
          .catch((err) => {
            console.error("Ошибка удаления карточки:", err);
          });
      }
    });
  } else {
    deleteButton.remove(); 
  }

  deleteButton.addEventListener("click", () => deleteCard(card));
  likeButton.addEventListener("click", () => handleLike(likeButton));
  cardImage.addEventListener("click", () => showImagePopup(title, imageUrl));

  return cardCopy;
}

export function removeCard(cardCopy) {
  cardCopy.remove();
}

export function handleLike(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}
