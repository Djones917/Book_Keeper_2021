const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

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
       alert('Please submit a valid website name and URL Address, both fields are required!');
   }
   if (urlValue.match(regex)) {
      alert('Match');
   }
   if (!urlValue.match(regex)) {
    alert('Please provide a valid web address!');
    return false;
 }
}

// Handle Data From Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    console.log(nameValue, urlValue);  
    validate(nameValue, urlValue);
}

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);