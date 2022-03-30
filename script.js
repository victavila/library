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
    card.classList.add("cards");
    let content = `Title:${arr[i].title} Author:${arr[i].author} Pages:${arr[i].pages} Read:${arr[i].read}`;
    card.innerText = content;
    main.appendChild(card);
  }
}

function deleteCards() {
  const cards = document.querySelectorAll(".cards");
  cards.forEach((card) => {
    card.remove();
  });
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
  sessionStorage.setItem("book", JSON.stringify(book));
  addBookToLibrary(JSON.parse(sessionStorage.getItem("book")));
  sessionStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  console.table(myLibrary);
  deleteCards();
  createCards(JSON.parse(sessionStorage.getItem("myLibrary")));
  e.target.reset();
});

createCards(JSON.parse(sessionStorage.getItem("myLibrary")));
