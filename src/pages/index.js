import {
  popupProfile,
  popupPlace,
  popupImage,
  popupAvatar,
  popupDelete,
  buttonProfileEdit,
  buttonAvatarEdit,
  buttonPlaceAdd,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  avatarInput,
  profileSubmitButton,
  placeSubmitButton,
  avatarSubmitButton,
  formProfileElement,
  formAvatarElement,
  popupModals,
  nameInput,
  jobInput,
  formPlaceElement,
  placeInput,
  imageInput,
  apiConfig,
  popupConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

import Api from "../components/Api.js";
const api = new Api(apiConfig);

let user;
let cardToDeleteId;
let cardToDelete;
// * Создание карточек с сервера
Promise.all([api.loadCards(), api.loadProfile()])
  .then(([cards, profile]) => {
    const profileInfo = new UserInfo(profile);
    profileInfo.setUserInfo();
    user = profileInfo.getUserId();
    const cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = new Card(item, user, ".card_template", {
            deleteButtonHandler: (evt) => {
              popupForDelete.openPopup();
              cardToDelete = evt.target.closest(".card");
              cardToDeleteId = cardToDelete.getAttribute("id", cardToDeleteId);
            },

            putLike: (likeCount, likeButton) => {
              api
                .placeLike(item._id)
                .then((res) => {
                  likeCount.textContent = res.likes.length;
                  likeButton.classList.add("card__like-button_active");
                })
                .catch((err) => {
                  console.log(err);
                });
            },

            deleteLike: (likeCount, likeButton) => {
              api
                .deleteLike(item._id)
                .then((res) => {
                  likeCount.textContent = res.likes.length;
                  likeButton.classList.remove("card__like-button_active");
                })
                .catch((err) => {
                  console.log(err);
                });
            },

            zoomPicture: (link, name) => {
              zoomedPicture.showImagePopup(link, name);
            },
          });
          const cardElement = card.generate();
          cardList.setItem(cardElement);
        },
      },
      ".cards"
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// * Экземпляр класса для FormValidator
const validationProfile = new FormValidator(popupConfig, formProfileElement);
validationProfile.enableValidation();

// * экземпляр класса для профиля
const popupWithProfile = new PopupWithForm(popupProfile, {
  submitHandler: () => {
    profileSubmitButton.textContent = "Сохранение...";
    api
      .editProfile(nameInput.value, jobInput.value)
      .then((profile) => {
        profileTitle.textContent = profile.name;
        profileSubtitle.textContent = profile.about;
        popupWithProfile.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileSubmitButton.textContent = "Сохранить";
      });
  },
});
popupWithProfile.setEventListeners();

buttonProfileEdit.addEventListener("click", function () {
  // вызов метода для профиля
  validationProfile.disablesValidation();
  popupWithProfile.openProfilePopup();
});
// * Avatar
const validationAvatarEdit = new FormValidator(popupConfig, formAvatarElement);
validationAvatarEdit.enableValidation();

// * экземпляр класса для аватара
const popupWithAvatar = new PopupWithForm(popupAvatar, {
  submitHandler: () => {
    avatarSubmitButton.textContent = "Сохранение...";
    api
      .updateAvatar(avatarInput.value)
      .then((res) => {
        profileAvatar.src = res.avatar;
        popupWithAvatar.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
      });
  },
});
popupWithAvatar.setEventListeners();

buttonAvatarEdit.addEventListener("click", function () {
  validationAvatarEdit.disablesValidation();
  popupWithAvatar.openPopup();
});
// * AddCard
const validationPlaceAdd = new FormValidator(popupConfig, formPlaceElement);
validationPlaceAdd.enableValidation();

// * экземпляр класса для карточек
const popupWithCard = new PopupWithForm(popupPlace, {
  submitHandler: () => {
    placeSubmitButton.textContent = "Создание...";
    api
      .addNewCard(placeInput.value, imageInput.value)
      .then((res) => {
        const newCard = new Card(res, user, ".card_template", {
          deleteButtonHandler: (evt) => {
            popupForDelete.openPopup();
            cardToDelete = evt.target.closest(".card");
            cardToDeleteId = cardToDelete.getAttribute("id", cardToDeleteId);
          },
          putLike: (likeCount, likeButton) => {
            api
              .placeLike(res._id)
              .then((res) => {
                likeCount.textContent = res.likes.length;
                likeButton.classList.add("card__like-button_active");
              })
              .catch((err) => {
                console.log(err);
              });
          },

          deleteLike: (likeCount, likeButton) => {
            api
              .deleteLike(res._id)
              .then((res) => {
                likeCount.textContent = res.likes.length;
                likeButton.classList.remove("card__like-button_active");
              })
              .catch((err) => {
                console.log(err);
              });
          },

          zoomPicture: (link, name) => {
            zoomedPicture.showImagePopup(link, name);
          },
        });
        const cardSection = new Section(
          {
            data: [],
          },
          ".cards"
        );
        const cardElement = newCard.generate();
        cardSection.addItem(cardElement);
        popupWithCard.closePopup();
        popupWithCard.resetPlacePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        placeSubmitButton.textContent = "Создать";
      });
  },
});
popupWithCard.setEventListeners();

buttonPlaceAdd.addEventListener("click", function () {
  validationPlaceAdd.disablesValidation();
  popupWithCard.openPopup();
});

// * Экземпляр класса для попапа увеличения картинки
const zoomedPicture = new PopupWithImage(popupImage);
zoomedPicture.setEventListeners();

// * Экземпляр класса для попапа удаления карточки
const popupForDelete = new PopupWithDelete(popupDelete, {
  submitHandler: () => {
    api
      .removeCard(cardToDeleteId)
      .then(() => {
        cardToDelete.remove();
        popupForDelete.closePopup();
      })
      .catch((err) => console.log(err));
  },
});
popupForDelete.setEventListeners();

export {
  popupProfile,
  popupModals,
  popupAvatar,
  popupDelete,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  popupPlace,
  popupImage,
  api,
  zoomedPicture,
  popupForDelete,
};
