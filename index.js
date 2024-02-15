"use strict";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputPage = document.querySelector(".input-page");
const inputCheckRead = document.querySelector(".input-read");
const btnSubmit = document.querySelector(".btn-submit");
const btnDeleteAll = document.querySelector(".btn-delete");
const bookContainer = document.querySelector(".book-container");
const bookList = document.querySelectorAll(".book-list");

function Book(title, author, page, read = false) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

Book.prototype.toggleStatus = function () {
  this.read = !this.read;
};

const library = [];

function displayBook(books) {
  bookContainer.innerHTML = "";
  books.forEach(function (book, i) {
    const status = book.read === true ? "status-read" : "status-unread";
    const checkMark = book.read ? " &#10003;" : "&times;";
    const html = `
                <div class="book-list" data-index="${i}">
                 <div class="title">
                  ${book.title}
                  </div>
                <div class="author">${book.author}</div>
                <div class="page">${book.page}</div>
                <div class="status ${status} " data-index="${i}">
                ${checkMark}
                </div>
               <div class="remove" data-index="${i}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
             <path
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              />
             </svg>
             </div>
             </div>
`;
    bookContainer.insertAdjacentHTML("beforeend", html);
  });
  attachToggleReadEventListeners();
}

function addBookToLibrary(title, author, page, read = false) {
  const book = new Book(title, author, page, read);
  return book;
}

function updateUI(e) {
  e.preventDefault();
  const readStatus = inputCheckRead.checked;
  const book = addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPage.value,
    readStatus
  );
  library.push(book);
  displayBook(library);
  attachRemoveEventListeners();
  inputTitle.value = inputAuthor.value = inputPage.value = "";
}

btnSubmit.addEventListener("click", updateUI);

function attachRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      if (index !== null && library[index]) {
        library.splice(index, 1); // Remove the book from the library array
        displayBook(library); // Update the UI after removing the book
      }
    });
  });
}

function attachToggleReadEventListeners() {
  const toggleReadButtons = document.querySelectorAll(".status");
  toggleReadButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      if (index !== null && library[index]) {
        library[index].toggleStatus();
        displayBook(library); // Update the UI after toggling the read status
      }
    });
  });
}
