const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector("button");
const popupTitle = document.querySelector("header p");

const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");

const months = ["Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"];
let isEdit = false;
let editId;
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click",()=>{
	titleTag.focus();
	popupBox.classList.add("show");
});

closeIcon.addEventListener("click",()=>{
	titleTag.value = "";
	descTag.value = "";
	addBtn.innerText="Add new note"
	popupTitle.innerText = "Add a new Note";
	popupBox.classList.remove("show");
});

function showNotes(){
	
	document.querySelectorAll(".note").forEach(note => note.remove());
	notes.forEach(function(note,ID){
		let liTag = `<li class="note">
									<div class="details">
										<p>${note.title}</p>
										<span>${note.description}</span>
									</div>
									<div class="bottom-content">
										<span>Oct 21, 2022</span>
										<div class="setting">
											<i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
											<ul class="menu">
												<li onclick="editNote(${ID})"><i class="fa-solid fa-pen"></i>edit</li>
												<li onclick="deleteNote(${ID})"><i class="fa-solid fa-trash"></i>delete</li>
											</ul>
										</div>
									</div>
								</li> `
		addBox.insertAdjacentHTML('afterend',liTag);
	})
};

showNotes();

function showMenu(ele){
	ele.parentElement.classList.add("show");
	document.addEventListener("click",e=>{
		if(e.target.tagName != "I" || e.target!=ele){
			ele.parentElement.classList.remove("show");
		}
	})
}

function editNote(noteId){
	addBox.click();
	isEdit = true;
	editId = noteId;
	popupTitle.innerText = "Edit Note";
	addBtn.innerText = "Edit note";
	titleTag.value = notes[noteId].title; 
	descTag.value = notes[noteId].description;
	
}

// DELTEE NOTE 
function deleteNote(noteId){
	let delOk = confirm("Are you sure you want delete this note??")
	if (!delOk) return;
	notes.splice(noteId,1);
	localStorage.setItem("notes",JSON.stringify(notes));
	showNotes();
}

addBtn.addEventListener("click",(e)=>{
	e.preventDefault();
	let noteTitle = titleTag.value;
	let noteDesc = descTag.value;
	if(noteTitle || noteDesc){
		console.log(noteTitle,noteDesc);
		let dateObj = new Date();
		let year = dateObj.getFullYear();
		let month = months[dateObj.getMonth()];
		let day =dateObj.getDate();
		
		let noteInfo = {
			title:noteTitle,
			description:noteDesc,
			date:`${month} ${day}, ${year}`
		}
		if(!isEdit){
			notes.push(noteInfo);	
		} else {
			notes[editId] = noteInfo;
		}
		let inputOk = confirm("Are you sure you want edit or add note??")
		if (!inputOk) return;
		localStorage.setItem("notes",JSON.stringify(notes));
		closeIcon.click();
		showNotes();
	} 
});