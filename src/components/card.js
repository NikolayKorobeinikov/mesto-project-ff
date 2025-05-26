const cardTemplate = document.querySelector("#card-template").content;
const image = document.querySelectorAll(".card__image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

export function createCard(title, imageUrl, deleteCard, handleLike, showImagePopup) {
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
  cardImage.addEventListener("click", ()=> showImagePopup(title, imageUrl));

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

  return cardCopy;
}

export function removeCard(cardCopy) {
  cardCopy.remove();
}

export function handleLike(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

