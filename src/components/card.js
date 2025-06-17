import {deleteCard as apiDeleteCard, addLike, removeLike} from './api.js';
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
  
  const likeCounter = cardCopy.querySelector(".card__like-count");

  cardTitle.textContent = title;
  cardImage.src = imageUrl;
  cardImage.alt = title;

  likeCounter.textContent = likes.length;

  if (likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId === currentUserId) {
    deleteButton.addEventListener("click", () => {
      if (confirm("Вы уверены, что хотите удалить карточку?")) {
        apiDeleteCard(cardId)
          .then(() => {
            deleteCard(card);
          })
          .catch((err) => {
            console.error("Ошибка удаления карточки:", err);
          });
      }
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => handleLike(cardId, likeButton, likeCounter));
  cardImage.addEventListener("click", () => showImagePopup(title, imageUrl));

  return cardCopy;
}

export function removeCard(cardCopy) {
  cardCopy.remove();
}

export function handleLike(cardId, likeBtn, likeCounter) {
  const isLiked = likeBtn.classList.contains("card__like-button_is-active");

  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId)
    .then((updatedCard) => {
      likeBtn.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}
