const modalGoal = document.querySelector('.modal--goal'),
      addList = document.querySelector('.modal__p'),
      closeModal = document.querySelector('.figure__close'),
      listGoal = document.querySelector('.field__list'),
      dateValue = document.querySelector('.date__value'),
      btnAdd = document.querySelector('.card__btn'),
      itemAdd = document.querySelector('.card__field'),
      tasks = [];

dateValue.addEventListener('change', () => {
  renderTask();
})

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
};

function buildEdit(){
  const edit = document.createElement('figure');
  edit.innerHTML = '<img src="img/edit.svg" alt="Edit Habit">';

  return edit
};

function buildParagraph(name){
  const p = document.createElement('p');
  
  p.textContent = name;
  
  return p
};

function buildClose(){
  const close = document.createElement('button'),
        length = listGoal.querySelectorAll('li').length;
        
  close.textContent= 'Remove'

  close.setAttribute('data-id', length + 1);

  close.addEventListener('click', (e) => {
    const element = listGoal.querySelector(`#item-${e.target.getAttribute('data-id')}`);
    element.remove();
    e.target.remove();
  })

  return close;
}

function createElement(task) {
  const li = document.createElement('li'),
        inputEdit = document.createElement('input'),
        p = buildParagraph(task.name),
        close = buildClose(),
        btn = buildBtn(),
        edit = buildEdit(),
        length = listGoal.querySelectorAll('li').length;

  edit.addEventListener('click', () => {
    p.remove();
    li.prepend(inputEdit);
  });
      
  li.classList.add('list__goals');
  li.id = `item-${length + 1}`;

  li.append(p, btn, edit, close)
  listGoal.append(li);
  
  itemAdd.value = '';
};

btnAdd.addEventListener('click', (e) => {
  addTask(itemAdd.value, dateValue.value);
  itemAdd.value = '';
});

function dateStorage() {
  let value = dateValue.value;
  const dataObj = JSON.stringify({ value });

  localStorage.setItem('dateValue', dataObj);
};

function addTask(name, date) {
  tasks.push({name, date});
  renderTask();
};

function renderTask() {
  unmountTasks();

  const date = dateValue.value
  tasks.filter((item) => {
    return item.date == date
  }).forEach((item) => {
    createElement(item);
  })

};

function unmountTasks() {
  document.querySelectorAll('.list__goals').forEach(item => {item.remove()})
}