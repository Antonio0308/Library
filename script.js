const table = document.querySelector("table");
const showForm = document.querySelector(".show-form");
const closeDialog = document.querySelector(".close-form");
const closeMessage = document.querySelector(".close-message");
const modalMessage = document.querySelector(".modal-message");
const modalForm = document.querySelector(".modal-form");
const form = document.querySelector("form");
const contentMessage = document.querySelector(".content-message");
const tbody = document.querySelector("tbody");

class Book {
  constructor(title, author, pages, readingStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatus;
    this.idBook = crypto.randomUUID();
  }

  changeStatusRead() {
    this.readingStatus =
      this.readingStatus.toLowerCase() === "read" ? "Not read" : "Read";
  }
}

class Library {
  #myLibrary;

  constructor() {
    this.#myLibrary = [];
  }

  get myLibrary() {
    return this.#myLibrary;
  }

  addBookToLibrary(book) {
    this.#myLibrary.push(book);
  }

  bookExist(title, author) {
    for (let i = 0; i < this.#myLibrary.length; i++) {
      if (
        this.#myLibrary[i].title.toUpperCase() === title.toUpperCase() &&
        this.#myLibrary[i].author.toUpperCase() === author.toUpperCase()
      ) {
        return true;
      }
    }
    return false;
  }

  myLibraryUpdate(id) {
    this.#myLibrary = this.#myLibrary.filter((item) => item.idBook !== id);
    this.showTableBooks();
  }

  showTableBooks() {
    let myLib = this.#myLibrary;
    tbody.innerHTML = "";
    for (let i = 0; i < myLib.length; i++) {
      const tr = document.createElement("tr");
      tbody.append(tr);
      const td1 = document.createElement("td");
      td1.textContent = i + 1;
      const td2 = document.createElement("td");
      td2.textContent = myLib[i].title;
      const td3 = document.createElement("td");
      td3.textContent = myLib[i].author;
      const td4 = document.createElement("td");
      td4.textContent = myLib[i].pages;
      const td5 = document.createElement("td");
      td5.textContent = myLib[i].readingStatus;
      const td6 = document.createElement("td");
      const btnChangeStatus = document.createElement("button");
      btnChangeStatus.setAttribute("data-id", myLib[i].idBook);
      btnChangeStatus.textContent = "Change Status";
      const td7 = document.createElement("td");
      const btnDelete = document.createElement("button");
      btnDelete.setAttribute("data-id", myLib[i].idBook);
      btnDelete.textContent = "Delete";
      td6.append(btnChangeStatus);
      td7.append(btnDelete);
      tr.append(td1, td2, td3, td4, td5, td6, td7);

      btnChangeStatus.addEventListener("click", () => {
        const id = btnChangeStatus.getAttribute("data-id");
        const book = myLib.find((item) => item.idBook === id);
        if (book) {
          book.changeStatusRead();
          this.showTableBooks();
        }
      });

      btnDelete.addEventListener("click", () => {
        const id = btnDelete.getAttribute("data-id");
        this.myLibraryUpdate(id);
      });
    }
  }
}

const myLib = new Library();

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
  if (myLib.bookExist(title, author)) {
    modalForm.close();
    contentMessage.textContent = "Book already exist !";
    modalMessage.showModal();
  } else {
    modalForm.close();
    myLib.addBookToLibrary(new Book(title, author, pages, readingStatus));
    myLib.showTableBooks();
    contentMessage.textContent = "Book created !";
    modalMessage.showModal();
  }
});
