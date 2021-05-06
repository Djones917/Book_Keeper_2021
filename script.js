const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];


// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}


// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));


// Validate Form
function validate(nameValue, urlValue) {
   const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
   const regex = new RegExp(expression);
   if (!nameValue || !urlValue) {
       alert('Please submit values for both fields!');
       return false;
   }  
   if (!urlValue.match(regex)) {
    alert('Please provide a valid web address!');
    return false;
 }
 //Valid

 return true;
}


// Build Bookmarks DOM
function buildBookmarks() {
    // Build Items
    bookmarks.forEach((bookmark) => {
       const { name, url } = bookmark;
       // Item
       const item = document.createElement('div');
       item.classList.add('item');
       // Close Icon
       const closeIcon = document.createElement('i');
       closeIcon.classList.add('fas', 'fa-times');
       closeIcon.setAttribute('title', 'Delete Bookmark');
       closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
       // Favicon / Link Container

    });
}


// Fetch Bookmars
function fetchBookmarks() {
    // Get Bookmarks From Local Storage If Available
    if (localStorage.getItem('bookmarks')) {
       bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in local storage
        bookmarks = [
            {
              name: 'Your Site',
              url: 'https://www.brvmuseum.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify('bookmarks'));
    }
    buildBookmarks();
}


// Handle Data From Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }    
    if (!validate(nameValue, urlValue)) {
       return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);   
    localStorage.setItem('bookmarks', JSON.stringify( bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}


// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);


// On Load, Fetch Bookmarks
fetchBookmarks();