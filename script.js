const table = document.querySelector("table");
const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();

  this.createdBook = function () {
    return [this.title, this.author, this.pages, this.id];
  };
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  const infoBook = book.createdBook();

  myLibrary.push({
    title: infoBook[0],
    author: infoBook[1],
    pages: infoBook[2],
    idBook: infoBook[3],
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
