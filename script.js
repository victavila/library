const myForm = document.querySelector("#my-form");
const submitButton = document.querySelector(".submit");
const main = document.querySelector(".main");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

function createCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div");
    let content = `Title:${arr[i].title} Author:${arr[i].author} Pages:${arr[i].pages} Read:${arr[i].read}`;
    card.innerText = content;
    main.appendChild(card);
  }
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read")
  );
  addBookToLibrary(book);
  console.table(myLibrary);
  e.target.reset();
});

createCards(myLibrary);
