export function openPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

export function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_is-opened");
}

export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

export function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
