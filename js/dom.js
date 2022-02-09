const books = [];
const RENDER_EVENT = "render";
function addBook(){
    const textBook = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;

    const completedBookList = document.getElementById("completeBookshelfList");
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");

    const generatedId = generateId();
    const checkbox = document.getElementById("inputBookIsComplete");

    if (checkbox.checked == true) {
        const bookObject = generateBookObject(generatedId, textBook, textAuthor, bookYear, true);
        books.push(bookObject);
        completedBookList.append(makeBook(bookObject));


    } else {
        const bookObject = generateBookObject(generatedId, textBook, textAuthor, bookYear, false);
        books.push(bookObject);
        uncompletedBookList.append(makeBook(bookObject));
    }
    

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId(){
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete){
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

document.addEventListener(RENDER_EVENT, function() {
    const incompleteBooks = document.getElementById("incompleteBookshelfList");
    incompleteBooks.innerHTML = "";

    const completeBooks = document.getElementById("completeBookshelfList");
    completeBooks.innerHTML = "";

    for (bookItem of books){
        const bookElement = makeBook(bookItem);

        if (bookItem.isComplete == false) 
            incompleteBooks.append(bookElement);
        else
            completeBooks.append(bookElement);
        
        
    }
});

function makeBook(bookObject){
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = bookObject.author;

    const bookYear = document.createElement("p");
    bookYear.innerText = bookObject.year;

    const button = document.createElement("div");
    button.classList.add("action");
    button.setAttribute("bookId", `book-${bookObject.id}`);

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookTitle, bookAuthor, bookYear, button);

    

    

    if(bookObject.isComplete){
        const undoButton = document.createElement("button");
        undoButton.classList.add("green");
        undoButton.innerText = "Belum Selesai dibaca"
        undoButton.addEventListener("click", function() {
            undoBookFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("red");
        deleteButton.innerText = "Hapus Buku";
        deleteButton.addEventListener("click", function() {
            deleteBook(bookObject.id);
        });

        button.append(undoButton, deleteButton);
    } else {
        const completeButton = document.createElement("button");
        completeButton.classList.add("green");
        completeButton.innerText = "Selesai dibaca";
        completeButton.addEventListener("click", function() {
            completeBook(bookObject.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("red");
        deleteButton.innerText = "Hapus Buku";
        deleteButton.addEventListener("click", function() {
            deleteBook(bookObject.id);
        });
        button.append(completeButton, deleteButton);
    }

    return container;

}

function completeBook(id){
    const bookTarget = findBook(id);
    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBook(id){
    for (bookItem of books){
        if (bookItem.id == id){
            return bookItem;
        }
    }
    return null;
}

function deleteBook(id){
    const bookTarget = findBookIndex(id);
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(id) {
    const bookTarget = findBook(id);
    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function findBookIndex(id){
    for (index in books) {
        if (books[index].id === id) {
            return index;
        }
    }

    return -1;
}
    


