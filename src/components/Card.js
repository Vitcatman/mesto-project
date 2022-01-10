export default class Card {
  constructor(
    cardData,
    user,
    selector,
    { deleteButtonHandler, putLike, deleteLike, zoomPicture }
  ) {
    this._user = user;
    this._selector = selector;
    this._likes = cardData.likes;
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._authorId = cardData.owner._id;
    this._deleteButtonHandler = deleteButtonHandler;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._zoomPicture = zoomPicture;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._likeCount = this._element.querySelector(".card__like-count");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCount.textContent = this._likes.length;
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._element.setAttribute("id", this._cardId);

    this._checkLikes();
    this._checkAuthor();
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._likeCard());
    this._cardDeleteButton.addEventListener("click", (evt) =>
      this._deleteButtonHandler(evt)
    );
    this._cardImage.addEventListener("click", () =>
      this._zoomPicture(this._link, this._name)
    );
  }

  _checkLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._authorId) {
        this._likeButton.classList.add("card__like-button_active");
      }
    });
  }

  _checkAuthor() {
    if (this._user !== this._authorId) {
      this._cardDeleteButton.classList.add("card__delete-button_hidden");
    }
  }

  _likeCard() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._deleteLike();
    } else {
      this._putLike();
    }
  }

  updateLikes(res) {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._likeCount.textContent = res.likes.length;
      this._likeButton.classList.remove("card__like-button_active");
    } else {
      this._likeCount.textContent = res.likes.length;
      this._likeButton.classList.add("card__like-button_active");
    }
  }
}
