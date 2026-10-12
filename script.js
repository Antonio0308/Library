const table = document.querySelector("table");
const showForm = document.querySelector(".show-form");
const closeDialog = document.querySelector(".close-form");
const closeMessage = document.querySelector(".close-message");
const modalMessage = document.querySelector(".modal-message");
const modalForm = document.querySelector(".modal-form");
const form = document.querySelector("form");
const contentMessage = document.querySelector(".content-message");
const tbody = document.querySelector("tbody");
let myLibrary = [];

let title, author, pages, readingStatus;

showForm.addEventListener("click", () => {
  modalForm.showModal();
});

closeDialog.addEventListener("click", () => {
  modalForm.close();
});

closeMessage.addEventListener("click", () => {
  modalMessage.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  title = formData.get("title");
  author = formData.get("author");
  pages = formData.get("pages");
  readingStatus = formData.get("status");
  if (bookExist(title, author)) {
    modalForm.close();
    contentMessage.textContent = "Book already exist !";
    modalMessage.showModal();
  } else {
    modalForm.close();
    addBookToLibrary(title, author, pages, readingStatus);
    showTableBooks();
    contentMessage.textContent = "Book created !";
    modalMessage.showModal();
  }
});

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readingStatus = readingStatus;
  this.idBook = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, readingStatus) {
  const book = new Book(title, author, pages, readingStatus);
  myLibrary.push(book);
}

function showTableBooks() {
  tbody.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const tr = document.createElement("tr");
    tbody.append(tr);
    const td1 = document.createElement("td");
    td1.textContent = i + 1;
    const td2 = document.createElement("td");
    td2.textContent = myLibrary[i].title;
    const td3 = document.createElement("td");
    td3.textContent = myLibrary[i].author;
    const td4 = document.createElement("td");
    td4.textContent = myLibrary[i].pages;
    const td5 = document.createElement("td");
    td5.textContent = myLibrary[i].readingStatus;
    const td6 = document.createElement("td");
    const button = document.createElement("button");
    button.setAttribute("data-id", myLibrary[i].idBook);
    button.textContent = "Delete";
    td6.append(button);
    tr.append(td1, td2, td3, td4, td5, td6);
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      myLibraryUpdate(id);
    });
  }
}

function myLibraryUpdate(id) {
  myLibrary = myLibrary.filter((item) => item.idBook !== id);
  showTableBooks();
}

function bookExist(title, author) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      myLibrary[i].title.toUpperCase() === title.toUpperCase() &&
      myLibrary[i].author.toUpperCase() === author.toUpperCase()
    ) {
      return true;
    }
  }
  return false;
}
