import './style.css';
(function () {

    let save;

    const addBtn = document.getElementById('addBtn');
    const inputRef = document.getElementById('myInput');
    const ulRef = document.getElementById('myUl');
    //Метод добавления элементов
    const createElem = ({ type, className = '', view }) => {
        const elem = document.createElement(type);
        const text = document.createTextNode(view);
        elem.className = className;
        elem.appendChild(text);
        return elem;
    }

    //Метод  добавления input
    const createInput = (config, newValue) => {
        const input = createElem(config);
        input.value = newValue;
        input.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                input.parentElement.firstChild.textContent = input.value;
                input.parentElement.lastChild.style.display='none';
            }
        });
        return input;
    }

    //Создаём метод добавления задач и добавляем элементы для новых обработчиков.
    addBtn.addEventListener('click', () => {
        const inputValue = inputRef.value;
        const li = createElem({ type: 'li', className: 'li', view: inputValue });

        if (inputValue === "") {
            alert('add you task');
        } else {
            ulRef.appendChild(li);
        }
        inputRef.value = "";
        li.appendChild(createElem({ type: 'span', className: 'edit', view: "edit" }));
        li.appendChild(createElem({ type: 'span', className: 'close', view: "\u00D7" }));
        li.appendChild(createInput({ type: 'input', className: 'hide' }, inputValue))

        saveTask();
    });
    //Метод для зачёркивания,удаленя,изменения задачи.
    const list = document.querySelector('ul');
    list.addEventListener('click', ({ target: { tagName, classList, className, parentNode } }) => {
        if (tagName.toLowerCase() === "li") {
            classList.toggle('checked');
            return;
        }

        if (className === "close") {
            parentNode.remove();
        }
        if (className === "edit") {
            
       parentNode.lastChild.style.display='block';

        }
        saveTask();
    }, false);
    //Метод сохранения задач в localStorage.
    const saveTask = () => {
        save = document.getElementById('myUl').innerHTML;
        localStorage.setItem("save", JSON.stringify(save));
    }
    //Загрузка заданий из localStorage .
    save = JSON.parse(localStorage.getItem("save"));
    document.getElementById('myUl').innerHTML = save;
})();
