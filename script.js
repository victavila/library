const myForm = document.querySelector("#my-form");
const submitButton = document.querySelector(".submit");
const main = document.querySelector(".main");
const formContainer = document.querySelector(".form");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const formTitle = myForm.elements["title"];
const formAuthor = myForm.elements["author"];
const formPages = myForm.elements["pages"];
const formRead = myForm.elements["read"];

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

function createCard(obj, id) {
  const card = document.createElement("div");
  const titleHeader = document.createElement("div");
  const body = document.createElement("div");
  const authorParagraph = document.createElement("p");
  const pagesParagraph = document.createElement("p");
  const readButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  card.dataset.id = id;

  titleHeader.textContent = obj.title;
  authorParagraph.textContent = obj.author;
  pagesParagraph.textContent = obj.pages;
  readButton.textContent = obj.read;
  deleteButton.textContent = "Delete";

  main.appendChild(card);
  card.appendChild(titleHeader);
  card.appendChild(body);
  card.appendChild(readButton);
  card.appendChild(deleteButton);
  body.appendChild(authorParagraph);
  body.appendChild(pagesParagraph);

  deleteButton.addEventListener("click", (e) => {
    myLibrary.splice(e.target.parentNode.dataset.id, 1);
    updateStorage();
    removeAllChildNodes(main);
    createCards();
  });

  readButton.addEventListener("click", (e) => {
    if (obj.read === "Read") {
      obj.read = "Not read";
      readButton.textContent = obj.read;
      updateStorage();
    } else {
      obj.read = "Read";
      readButton.textContent = "Read";
      updateStorage();
    }
  });
}

function createCards() {
  if (myLibrary.length == 0) {
  } else {
    for (let i = 0; i < myLibrary.length; i++) {
      createCard(myLibrary[i], i);
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function setStorage() {
  if (!JSON.parse(localStorage.getItem("library"))) {
    localStorage.setItem("library", JSON.stringify([]));
  } else {
    myLibrary = JSON.parse(localStorage.getItem("library"));
  }
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = new Book(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.value
  );
  addBookToLibrary(book);
  removeAllChildNodes(main);
  createCards();
  updateStorage();
  myForm.reset();
  formContainer.style.display = "none";
});

addButton.addEventListener("click", () => {
  formContainer.style.display = "block";
});

closeButton.addEventListener("click", () => {
  formContainer.style.display = "none";
  myForm.reset();
});

setStorage();
createCards();
