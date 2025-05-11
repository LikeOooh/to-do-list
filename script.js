const todo = {
    userId: null,
    id: null,
    title: null,
    completed: null
}
let localTodos = [];
//localStorage.clear();

// Если userId сохранился в sessionStorage, используем его...
let curUserId = null;
if (sessionStorage.getItem('user-id')) {
    if (!isNaN(sessionStorage.getItem('user-id'))) {
        curUserId = sessionStorage.getItem('user-id');
        document.getElementById('user-id').value = curUserId;
    }
}

// загрузка из localStorage, т.к. текущий список пока пуст
if (localStorage.getItem('localTodos')) { getTodos() };

//очистка инпута
function clearInput() {
    input = document.getElementById('todo-input');
    input.value = '';
}

//Выборка задач
function getTodos() {
    let n = 0;
    const todoList = document.getElementById('todos');
    todoList.innerHTML = '';
    if (localTodos.length == 0) {
        //Если текущий список пуст, загружаем задачи из localstorage
        if (localStorage.getItem('localTodos')) {
            localStorage.getItem('localTodos').length <= 1
                ? localTodos.push(JSON.parse(localStorage.getItem('localTodos')))
                : localTodos = JSON.parse(localStorage.getItem('localTodos'));
        }
    }

    localTodos.forEach((item) => {
        todoItem = `<div ${item.completed === true ? 'class="todo completed"' : 'class="todo"'} id="todo-${n}"><input class="todo-checkbox" ${item.completed === true ? `checked` : `unchecked`} type="checkbox" id="checkbox-${n}"><span>${item.title}   </span><div class="reminder"}><img src="./remind.png" alt="bell" id="img-${n}"></div><button class="delTodo" id="button-${n}">Удалить</button></div>`;
        todoList.innerHTML = todoItem + todoList.innerHTML;
        n++;
    })
}
getTodos();

//Загрузка списка задач с ресурса по кнопке
document.getElementById('loadTodos').addEventListener('click', () => {

    document.getElementById('todos').innerHTML = 'Загружаем данные...';
    curUserId = parseInt(document.getElementById('user-id').value);
    if (curUserId > 10) {
        alert('Введите User ID (значение может быть не более 10)');
        document.getElementById('user-id').value = '';
    }
    sessionStorage.setItem('user-id', curUserId);

    //Загружаем задачи по API в localStorage    
    localTodos = [];
    localStorage.clear();

    let source = 'https://jsonplaceholder.typicode.com/todos';
    if (curUserId) {
        if (curUserId)
            source = 'https://jsonplaceholder.typicode.com/todos?userId=' + curUserId;
    }

    fetch(source)
        .then(response => response.json())
        .then(todos => {
            todos.forEach((item) => {
                if (!localStorage.getItem('localTodos') || localStorage.getItem('localTodos').length <= 1) {
                    localTodos.push(item);
                    localStorage.setItem('localTodos', JSON.stringify(localTodos));
                }
                else if (localStorage.getItem('localTodos').length > 1) {
                    localTodos = JSON.parse(localStorage.getItem('localTodos'));
                    localTodos.push(item);
                    localStorage.setItem('localTodos', JSON.stringify(localTodos));
                }
            });
            console.log('Данные загружены');
            getTodos();
        })
        .catch(error => {
            console.log(error);
        });
})

//Все задачи списка
document.getElementById('allTodos').addEventListener('click', () => {
    let allTodos = document.getElementsByClassName('todo');
    for (const item of allTodos) {
        item.classList.remove('hide');
    }
})

//Выполненные задачи из списка
document.getElementById('completedTodos').addEventListener('click', () => {
    let allTodos = document.getElementsByClassName('todo');
    for (const item of allTodos) {
        if (item.classList.contains('completed'))
            item.classList.remove('hide');
        if (!item.classList.contains('completed'))
            item.classList.add('hide');
    }
})

//Невыполненные задачи из списка
document.getElementById('uncompletedTodos').addEventListener('click', () => {
    let allTodos = document.getElementsByClassName('todo');
    for (const item of allTodos) {
        if (item.classList.contains('completed'))
            item.classList.add('hide');
        if (!item.classList.contains('completed'))
            item.classList.remove('hide');
    }
})


//Удаление поста, выполнение задачи, установка напоминания
document.getElementById('todos').addEventListener('click', (event) => {
    //Если нажали на кнопку удаления
    if (event.target.tagName === 'BUTTON') {
        let curId = event.target.id.split("button-")[1];
        localTodos.splice(curId, 1);
        localStorage.setItem('localTodos', JSON.stringify(localTodos));
        getTodos();
    }
    //Если нажали на чекбокс
    if (event.target.tagName === 'INPUT') {
        let curId = event.target.id.split("checkbox-")[1];
        if (event.target.checked == true) {
            //Помечаем задачу выполненной            
            document.getElementById('todo-' + curId).classList.add('completed');
            localTodos[curId].completed = true;
            localStorage.setItem('localTodos', JSON.stringify(localTodos));
            //onsole.log(localTodos[curId]);            
        }
        else {
            //Помечаем задачу невыполненной   
            document.getElementById('todo-' + curId).classList.remove('completed');
            localTodos[curId].completed = false;
            localStorage.setItem('localTodos', JSON.stringify(localTodos));
        }
    }
    //Если нажали на иконку напоминания
    if (event.target.tagName === 'IMG') {
        let curId = event.target.id.split("img-")[1];
        let min = prompt(`Установить напоминание (минут)`);
        if (!min == 0) {
            setTimeout(() => {
                alert(localTodos[curId].title);
            }, min * 1000 * 60);
        }
    }
})


//Фиксируем ввод данных
document.getElementById('form').addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT') {
        todo.title = event.target.value;
        todo.userId = curUserId;
        todo.completed = false;
        todo.id = localTodos.length;

    }
})


//Добавляем задачу 
document.getElementById('addTodo').addEventListener('click', (event) => {
    if (todo.title && todo.title && todo.title && todo.title) {
        event.preventDefault();
        localTodos.push(todo);
        getTodos();
        clearInput();
    }
})

//Сохраняем список задач перед закрытием окна
window.onbeforeunload = () => {
    localStorage.setItem('localTodos', JSON.stringify(localTodos));
}
