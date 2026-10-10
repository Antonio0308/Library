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
