const modalGoal = document.querySelector('.modal--goal'),
      addList = document.querySelector('.modal__p'),
      closeModal = document.querySelector('.figure__close'),
      dateValue = document.querySelector('.date__value');

console.log(dateValue.value)      

addList.addEventListener('click', () => {
  modalGoal.style.display = '';
  modalGoal.classList.toggle('modal-show');
});

closeModal.addEventListener('click', () => {
  modalGoal.style.display = 'none';
  modalGoal.classList.toggle('modal-show');
})
