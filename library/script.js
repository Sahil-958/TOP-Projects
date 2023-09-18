const themeBtnLight = document.getElementById('light');
const themeBtnDark = document.getElementById('dark');
const addBtn = document.getElementById('add');
const overlay = document.getElementById('overlay');
const closeOverlayBtn = document.getElementById('closeOverlay');
const gridCont = document.getElementById('grid-cont');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const cover = document.getElementById('cover');
const readStatus = document.getElementById('readStatus');
const bookLib = [];
var isDuplicateTitle = false;

themeBtnLight.addEventListener('click', e => switchTheme(e));
themeBtnDark.addEventListener('click', e => switchTheme(e));
addBtn.addEventListener('click', e => toggleDialog(e));
closeOverlayBtn.addEventListener('click', e => toggleDialog(e));
title.addEventListener('input', e => preventDuplicateTitle(e));
gridCont.addEventListener('click', e => removeBook(e));

document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        toggleDialog(e);
    }
});

class Book {
    constructor(title, author, pages, cover, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.cover = cover;
    }
}

function switchTheme(e) {
    e.currentTarget.classList.toggle('hide');
    e.currentTarget.id === "dark" ? themeBtnLight.classList.toggle('hide') : themeBtnDark.classList.toggle('hide');
    let bodyClassList = document.body.classList;
    bodyClassList.toggle('light-theme');
}

function toggleDialog(e) {
    overlay.classList.toggle('hideOverlay');
    if (!overlay.classList.contains('hideOverlay')) title.focus();
}

function handleSubmission(event) {
    event.preventDefault();
    preventDuplicateTitle();
    if (isDuplicateTitle) return;
    toggleDialog();
    let book = new Book(title.value, author.value, pages.value, cover.value, readStatus.checked);
    isValidImageURL(book, updateCover);
    addBook(book);
}


function isValidImageURL(book, callback) {
    let url = book.cover;
    const img = new Image();
    let isImageLoaded = false;

    img.onload = function () {
        if (!isImageLoaded) {
            isImageLoaded = true;
            callback(book, true); // Image exists
        }
    }
    img.src = url;
}



function addBook(book) {
    bookLib.push(book);
    let bookCard = document.createElement('div');
    bookCard.setAttribute('id', book.title);
    bookCard.classList.add('card');
    bookCard.innerHTML = `<img src="assets/placeholder.svg" alt="Book Cover" id="${book.title}image">
    <div class="infoCont">
        <div class="info">
            <p>Title:</p>
            <p>${book.title}</p>
        </div>
        <div class="info">
            <p>Author:</p>
            <p>${book.author}</p>
        </div>
        <div class="info">
            <p>Pages:</p>
            <p>${book.pages}</p>
        </div>
        <div class="info">
            <p>Stats:</p>
            <p>${book.readStatus}</p>
        </div>
    </div>
    <div class="infoBtnCont">
    <div id="${book.title}trash" class="trash"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg></div>
    </div>  
    `;
    gridCont.appendChild(bookCard);
    let coverImg = document.getElementById(book.title + "image");
    coverImg.style.transition = "opacity 1s ease-in-out";
}

function updateCover(book, isValid) {
    let coverImg = document.getElementById(book.title + "image");
    let sameHeight = coverImg.height;
    coverImg.style.opacity = "0";
    setTimeout(() => {
        book.cover = isValid ? book.cover : 'assets/placeholder.svg';
        coverImg.setAttribute('src', book.cover);
        let marginSize = (sameHeight - coverImg.height) / 2;
        coverImg.style.marginTop = marginSize + "px";
        coverImg.style.marginBottom = marginSize + "px";
        coverImg.style.opacity = "1";
    }, 1000);
}

function removeBook(e) {
    const trashBtn = e.target.closest('.trash');
    if (trashBtn) {
        const bookTitle = trashBtn.id.replace("trash", "");
        const bookIndex = bookLib.findIndex(book => book.title === bookTitle);

        if (bookIndex !== -1) {
            bookLib.splice(bookIndex, 1);
            let bookToRemove = document.getElementById(bookTitle);
            bookToRemove.style.transition = 'all 0.5s ease';
            bookToRemove.style.scale = '1.15';
            bookToRemove.style.filter = 'blur(4px)'
            setTimeout(() => {
                bookToRemove.style.scale = '0';
            }, 500);
            setTimeout(() => {
                gridCont.removeChild(bookToRemove);
            }, 1000);

        }
    }
}

function preventDuplicateTitle(e) {
    isDuplicateTitle = bookLib.find(book => book.title === title.value);
    let errorText = document.getElementById('errorText');
    if (isDuplicateTitle) {
        errorText.style.translate = "0 0";
        errorText.textContent = `${title.value} Already Exists!`;
        title.style.borderColor = "var(--error-color)";
        document.getElementById('titleCont').querySelector('label').style.backgroundColor = "var(--error-color)";
    } else {
        errorText.style.translate = "0 -50px";
        errorText.style.zIndex = "-999";
        title.style.borderColor = "";
        document.getElementById('titleCont').querySelector('label').style.backgroundColor = "";
    }
}