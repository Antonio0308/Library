const table = document.querySelector("table");
const showBtn = document.querySelector(".show-form");
const closeBtn = document.querySelector(".close-form");
const closeMessage = document.querySelector(".close-message");
const modalMessage = document.querySelector(".modal-message");
const modalForm = document.querySelector(".modal-form");
const form = document.querySelector("form");
const myLibrary = [];

let title, author, pages, readingStatus;

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readingStatus = readingStatus;
  this.id = crypto.randomUUID();

  this.createdBook = function () {
    return [this.title, this.author, this.pages, this.readingStatus, this.id];
  };
}

function addBookToLibrary(title, author, pages, readingStatus) {
  const book = new Book(title, author, pages, readingStatus);
  const infoBook = book.createdBook();

  myLibrary.push({
    title: infoBook[0],
    author: infoBook[1],
    pages: infoBook[2],
    readingStatus: infoBook[3],
    idBook: infoBook[4],
  });
}

function showTableBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const numBook = i + 1;
    const booksObject = myLibrary[i];
    const listInfoBooks = [
      booksObject.title,
      booksObject.author,
      booksObject.pages,
      booksObject.readingStatus,
    ];
    const newTr = document.createElement("tr");
    table.append(newTr);
    const newTd = document.createElement("td");
    newTd.textContent = numBook;
    newTr.append(newTd);
    for (let i = 0; i < listInfoBooks.length; i++) {
      const newTd = document.createElement("td");
      newTd.textContent = listInfoBooks[i];
      newTr.append(newTd);
    }
  }
}

showBtn.addEventListener("click", () => {
  modalForm.showModal();
});

closeBtn.addEventListener("click", () => {
  modalForm.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  title = formData.get("title");
  author = formData.get("author");
  pages = formData.get("pages");
  readingStatus = formData.get("status");
  modalForm.close();
  modalMessage.showModal();
  addBookToLibrary(title, author, pages, readingStatus);
  showTableBooks();
});

closeMessage.addEventListener("click", () => {
  modalMessage.close();
});
