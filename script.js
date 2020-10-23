const modalGoal = document.querySelector('.modal--goal'),
      addList = document.querySelector('.modal__p'),
      closeModal = document.querySelector('.figure__close'),
      listGoal = document.querySelector('.field__list'),
      dateValue = document.querySelector('.date__value'),
      btnAdd = document.querySelector('.card__btn'),
      itemAdd = document.querySelector('.card__field');

let tasks = [];

window.onload = recoveryTask();

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

  close.setAttribute('data-id', length);

  close.addEventListener('click', (e) => {
    const element = document.querySelector(`#item-${e.target.getAttribute('data-id')}`);
    element.remove();
    e.target.remove();
    tasks.splice(element.id.replace("item-",""), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  })

  return close;
}

function createElement(task, index) {
  const li = document.createElement('li'),
        inputEdit = document.createElement('input'),
        close = buildClose(),
        btn = buildBtn(),
        edit = buildEdit(),
        length = listGoal.querySelectorAll('li').length;

let p = buildParagraph(task.name);
  edit.addEventListener('click', () => {
    p.remove();
    li.prepend(inputEdit);
  });

  inputEdit.addEventListener('keyup', (e) => {
    if(e.code !== 'Enter') return
    inputEdit.remove();
    p = buildParagraph(inputEdit.value);
    li.prepend(p);
    task.name = inputEdit.value
    localStorage.setItem('tasks', JSON.stringify(tasks))
  })

  li.classList.add('list__goals');
  li.id = `item-${index}`;

  li.append(p, btn, edit, close)
  listGoal.append(li);
  
  itemAdd.value = '';
};

btnAdd.addEventListener('click', (e) => {
  addTask(itemAdd.value, dateValue.value);
  itemAdd.value = '';
});

function addTask(name, date) {
  tasks.push({name, date});
  renderTask();

  localStorage.setItem('tasks', JSON.stringify(tasks))
};

function renderTask() {
  unmountTasks();

  const date = dateValue.value
  tasks.filter((item) => {
    return item.date == date
  }).forEach((item, index) => {
    createElement(item, index);
  })

};

function unmountTasks() {
  document.querySelectorAll('.list__goals').forEach(item => {item.remove()})
}

function recoveryTask() {
  const value = JSON.parse(localStorage.getItem('tasks'));
  if(localStorage.getItem('tasks')){
    tasks = value.reduce(
      (accumulator, currentValue ) => accumulator.concat(currentValue),
      []
      )
  }
  renderTask()
}