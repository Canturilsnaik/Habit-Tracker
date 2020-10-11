const modalGoal = document.querySelector('.modal--goal'),
      addList = document.querySelector('.modal__p'),
      closeModal = document.querySelector('.figure__close'),
      listGoal = document.querySelector('.field__list'),
      dateValue = document.querySelector('.date__value'),
      btnAdd = document.querySelector('.card__btn'),
      itemAdd = document.querySelector('.card__field');

addList.addEventListener('click', () => {
  if(!dateValue.value){
    alert('Put a date')
    return
  }
  openModal();
})

function openModal(){
  modalGoal.style.display = '';
  modalGoal.classList.toggle('modal-show');
};

closeModal.addEventListener('click', () => {
  modalGoal.style.display = 'none';
  modalGoal.classList.toggle('modal-show');
});

function buildBtn(){
  const btn = document.createElement('figure');

  btn.innerHTML = `<img src="./img/download_done.svg" alt="Arrow done">`;

  return btn;
}

function buildEdit(){
  const edit = document.createElement('figure');
  edit.innerHTML = '<img src="img/edit.svg" alt="Edit Habit">';

  return edit
}

function buildParagraph(){
  const p = document.createElement('p');
  
  p.textContent = itemAdd.value;
  
  return p
};

function createElement() {
  const li = document.createElement('li'),
        inputEdit = document.createElement('input'),
        p = buildParagraph(),
        btn = buildBtn(),
        edit = buildEdit(),
        length = listGoal.querySelectorAll('li').length;

  li.classList.add('list__goals');
  li.id = `item-${length + 1}`;

  li.append(p, btn, edit)
  listGoal.append(li);
  
  itemAdd.value = '';
};

btnAdd.addEventListener('click', () => {
  createElement();
});