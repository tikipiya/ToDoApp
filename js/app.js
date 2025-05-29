// DOM要素の取得
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// ローカルストレージからToDoを読み込む
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// ToDoの保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ToDoの表示
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item flex items-center justify-between p-3 bg-gray-50 rounded-lg ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       class="w-4 h-4 text-blue-500 rounded focus:ring-blue-500">
                <span class="text-gray-800">${todo.text}</span>
            </div>
            <button class="delete-btn text-red-500 hover:text-red-700">
                削除
            </button>
        `;

        // チェックボックスのイベントリスナー
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        // 削除ボタンのイベントリスナー
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        todoList.appendChild(li);
    });
}

// 新しいToDoの追加
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        todos.push({
            text: todoText,
            completed: false
        });
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});

// 初期表示
renderTodos(); 