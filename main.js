import './ChoosePhoto.js';
import './EditPhoto.js';

const choosePhoto = document.querySelector('choose-photo');
const editPhoto = document.querySelector('edit-photo');
editPhoto.style.display = 'none';

choosePhoto.addEventListener('choose', (e) => {
  editPhoto.image = e.detail.value;
  choosePhoto.style.display = 'none';
  editPhoto.style.display = 'grid';
});

editPhoto.addEventListener('toggle', (e) => {
  document.body.classList.toggle('invertedColors', e.detail.value);
});
