class Utils {
function openPopup(popup) {
    console.log (popup)
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
    popup.addEventListener("click", handleOverlayClick);
    closeBtn.addEventListener("click",  ()=> closePopup(popup)) 
  }
  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
    popup.removeEventListener("click", handleOverlayClick);
  }
  function handleEscape(e) {
    const key = e.key;
    if (key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      closePopup(openedPopup);
    }
  }




}

  export {openPopup, closePopup};