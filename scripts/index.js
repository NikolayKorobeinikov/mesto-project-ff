// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки

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
