const input = document.querySelector('.input');
const addbtn = document.querySelector('.addbtn');
const notesList = document.querySelector('.notesList');
const errorMsg = document.querySelector('.errorMsg');

let currentEditedValue = 0;
addbtn.addEventListener('click',()=>{
    const note = input.value.trim();
    addNotes(note);
})
function addNotes(note){
    if(note === ""){
        errorMsg.innerText = "Enter some text first";
    }
    else if(addbtn.innerHTML == "Edit note"){
        editValue(note);
        addbtn.innerHTML = "Add note";
        input.value = "";
        input.focus();
    }
    else{
         const newNote = createNote(note);
         notesList.appendChild(newNote);
        errorMsg.textContent = "";
        input.value = "";
        input.focus();
        saveToLocalStorage(note);
    }
}
// edit value 
function editValue(note){
    let data;
    if(localStorage.getItem('notes')=== null){
        data = [];
    }else{
        data = JSON.parse(localStorage.getItem('notes'));
        let index = data.indexOf(currentEditedValue.target.previousSibling.innerText);
        console.log(currentEditedValue.target.previousSibling.innerText);
        data[index] = note;
        currentEditedValue.target.previousSibling.innerText = note;
        console.log(index);
        localStorage.setItem('notes',JSON.stringify(data));
        console.log(data);
        }
}
function createNote(note){
    const p = document.createElement('p');
    p.textContent = note;
    const li = document.createElement('li');
    li.classList.add('listItem');
    li.appendChild(p);
    // edit 
    const editbtn = document.createElement('button');
    editbtn.textContent = "edit";
    editbtn.classList.add('btn', 'editbtn');
    li.appendChild(editbtn);
     // delete 
     const deletebtn = document.createElement('button');
     deletebtn.textContent = "delete";
     deletebtn.classList.add( 'btn','deletebtn');
     li.appendChild(deletebtn);
     return li;
}
function saveToLocalStorage(note){
    let notesArray ;
    if(localStorage.getItem('notes')===null){
        notesArray = [];
    }
    else{
        notesArray = JSON.parse(localStorage.getItem('notes'));
    }
    notesArray.push(note);
    localStorage.setItem('notes',JSON.stringify(notesArray)
);
}
document.addEventListener("DOMContentLoaded",fetchLocalStorageData);
function fetchLocalStorageData(){
 let array;
 if(localStorage.getItem('notes')=== null){
    array = [];
 }else{
    array = JSON.parse(localStorage.getItem('notes'));
    array.forEach((item)=>{
        const newData = createNote(item);
        notesList.appendChild(newData);
    })}
}
// console.log(notesList.children);
// data.forEach(item=> console.log(item));
notesList.addEventListener('click',editAndDeleteFunctions);
function editAndDeleteFunctions(event){
        // console.log(event);
    if(event.target.innerText === "delete"){
        notesList.removeChild(event.target.parentElement);
        // delete from localstorage 
        deleteFromLocalStorage(event.target.parentElement);
    }
    else if(event.target.innerText === "edit"){
        input.value =  event.target.previousSibling.innerText;
        addbtn.innerHTML = "Edit note";
        input.focus();
        currentEditedValue = event;
    }
}
function deleteFromLocalStorage(deletenote){
    let array ;
    if(localStorage.getItem('notes')=== null){
        array = [];
    }else{
        array = JSON.parse(localStorage.getItem('notes'));
        let index = array.indexOf(deletenote.firstChild.innerText);
        array.splice(index,1);
        localStorage.setItem('notes',JSON.stringify(array));
    }
}