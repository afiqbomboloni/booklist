const SAVED_EVENT = "saved-books";
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist(){
    if(typeof(Storage) == "undefined"){
        alert("Web Storage is supported");
        return false;
    }
    return true;
}   

document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
});
function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}
function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}