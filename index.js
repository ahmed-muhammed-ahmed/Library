"use strict";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputPage = document.querySelector(".input-page");
const inputRead = document.querySelector(".input-read");
const btnSubmit = document.querySelector(".btn-submit");
const btnDeleteAll = document.querySelector(".btn-delete");
const bookContainer = document.querySelector(".book-container");
const bookList = document.querySelectorAll(".book-list");
const btnRemove = document.querySelectorAll(".remove");

function Book(title, author, page) {
  this.title = title;
  this.author = author;
  this.page = page;
}
Book.prototype.status = function () {};
const book1 = new Book("The Intelligent Investor", "Benjamin Graham", 640);
const book2 = new Book("Rich Dad Poor Dad", "Robert T. Kiyosaki", 336);
const book3 = new Book("Thinking, Fast and Slow", "Daniel Kahneman ", 512);
const book4 = new Book("The Richest Man in Babylon", "George S. Clason", 194);

const library = [book1, book2, book3, book4];
// const library = [];

function displayBook(books) {
  bookContainer.innerHTML = "";
  books.forEach(function (book, i) {
    const status = book.read === true ? "status-read" : "status-unread";
    const checkMark = status === "status-read" ? " &#10003;" : "&times;";
    const html = `
                <div class="book-list" data-index="${i}">
                 <div class="title">
                  ${book.title}
                  </div>
                <div class="author">${book.author}</div>
                <div class="page">${book.page}</div>
                <div class="status ${status}">
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
}

function addBookToLibrary(title, author, page) {
  const book = new Book(title, author, page);
  return book;
}

function updateUI(e) {
  e.preventDefault();
  const book = addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPage.value
  );
  library.push(book);
  displayBook(library);
  attachRemoveEventListeners();
  inputTitle.value = inputAuthor.value = inputPage.value = "";
}

btnSubmit.addEventListener("click", updateUI);

function attachRemoveEventListeners() {
  const btnRemove = document.querySelectorAll(".remove");
  btnRemove.forEach(function (el, i) {
    el.addEventListener("click", function () {
      const dataIndex = el.getAttribute("data-index");
      if (dataIndex !== null && library[dataIndex]) {
        bookList[dataIndex].innerHTML = ""; // Remove the corresponding book from UI
        library.splice(dataIndex, 1); // Remove the corresponding book from the library array
      }
    });
  });
}

// btnRemove.forEach(function (el, i) {
//   el.addEventListener("click", function () {
//     console.log("Remove button clicked for index:", i);
//   });
// });
