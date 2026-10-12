const table = document.querySelector("table");
const showBtn = document.querySelector(".show-form");
const closeBtn = document.querySelector(".close-form");
const closeMessage = document.querySelector(".close-message");
const modalMessage = document.querySelector(".modal-message");
const modalForm = document.querySelector(".modal-form");
const form = document.querySelector("form");
const contentMessage = document.querySelector(".content-message");
const myLibrary = [];

let title, author, pages, readingStatus;

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

closeMessage.addEventListener("click", () => {
  modalMessage.close();
});

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
  const numBook = myLibrary.length;
  const booksObject = myLibrary[numBook - 1];
  const listInfoBooks = [
    booksObject.title,
    booksObject.author,
    booksObject.pages,
    booksObject.readingStatus,
  ];
  const newTr = document.createElement("tr");
  table.append(newTr);
  const newTd = document.createElement("td");
  newTd.setAttribute("scope", "row");
  newTd.textContent = numBook;
  newTr.append(newTd);
  for (let i = 0; i < listInfoBooks.length; i++) {
    const newTd = document.createElement("td");
    newTd.textContent = listInfoBooks[i];
    newTr.append(newTd);
  }
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
