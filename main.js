//Создаём метод добавления задач и добавляем элементы для новых обработчиков.
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',()=>{
    let li=document.createElement('li');
    let inputValue=document.getElementById('myInput').value;
    let text=document.createTextNode(inputValue);
    li.appendChild(text);
    if(inputValue===""){
        alert('add you task')
    }
    else{
        document.getElementById('myUl').appendChild(li);
    }
    document.getElementById('myInput').value="";
    let spanCls = document.createElement("span");
    let spanEdit = document.createElement("span");
    let txtCls=document.createTextNode("\u00D7")
    let txtEdit=document.createTextNode("edit")
    spanCls.className="close";
    spanEdit.className="edit";
    spanCls.appendChild(txtEdit);
    spanEdit.appendChild(txtCls);
    li.appendChild(spanCls);
    li.appendChild(spanEdit);
});

//Метод для зачёркивания,удаленя,изменения задачи.
let list=document.querySelector('ul');
list.addEventListener('click',(ev)=>{
    if (ev.target.tagName==="LI"){
        ev.target.classList.toggle('checked');
    }
    else if(ev.target.tagName==="span"){
        let div=ev.target.parentNode;
        div.remove();
    }
},false);