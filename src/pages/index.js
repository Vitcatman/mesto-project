import {
  // popupProfile,
  // popupPlace,
  // popupImage,
  // popupAvatar,
  // popupDelete,
  zoomImg,
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
  nameInput,
  jobInput,
  formPlaceElement,
  placeInput,
  imageInput,
  apiConfig,
  popupConfig,
  popupCardDeleteButton,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
// коммент
import "./index.css";

import Api from "../components/Api.js";
const api = new Api(apiConfig);

let user;
let cardToDeleteId;
let cardToDelete;


const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, user, ".card-template", {
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
          zoomedPicture.openPopup(link, name);
        },
      });
      return card.generate();
    },
  },
  ".cards"
);


// * Создание карточек с сервера
Promise.all([api.loadCards(), api.loadProfile()])
  .then(([cards, profile]) => {
    const profileInfo = new UserInfo(profile);
    profileInfo.setUserInfo();
    user = profileInfo.getUserId();
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// * Экземпляр класса для FormValidator
const validationProfile = new FormValidator(popupConfig, formProfileElement);
validationProfile.enableValidation();

// * экземпляр класса для профиля
const popupWithProfile = new PopupWithForm(".popup_type_profile", {
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
  validationProfile.disableValidation();
  popupWithProfile.openProfilePopup();
});
// * Avatar
const validationAvatarEdit = new FormValidator(popupConfig, formAvatarElement);
validationAvatarEdit.enableValidation();

// * экземпляр класса для аватара
const popupWithAvatar = new PopupWithForm(".popup_type_avatar-add", {
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
  validationAvatarEdit.disableValidation();
  popupWithAvatar.openPopup();
});
// * AddCard
const validationPlaceAdd = new FormValidator(popupConfig, formPlaceElement);
validationPlaceAdd.enableValidation();

// * экземпляр класса для карточек
const popupWithCard = new PopupWithForm(".popup_type_place-add", {
  submitHandler: () => {
    placeSubmitButton.textContent = "Создание...";
    api
      .addNewCard(placeInput.value, imageInput.value)
      .then((res) => {
        cardList.addItem(res);
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
  validationPlaceAdd.disableValidation();
  popupWithCard.openPopup();
});

// * Экземпляр класса для попапа увеличения картинки
const zoomedPicture = new PopupWithImage(".popup_type_image", zoomImg);
zoomedPicture.setEventListeners();

// * Экземпляр класса для попапа удаления карточки
const popupForDelete = new PopupWithDelete(".popup_type_delete-card", popupCardDeleteButton, {
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
  // popupProfile,
  // popupModals,
  // popupAvatar,
  // popupDelete,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  // popupPlace,
  // popupImage,
  api,
  zoomedPicture,
  popupForDelete,
};
