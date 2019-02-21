
const $iframe = document.querySelector('.modal .youtube-container iframe');
const videoID = "LPjblqE3xHk"
const $youtubeThumbs = document.querySelector('.youtube-thumbs');
const $overlay = document.querySelector('.overlay');
const $closeBtn = document.querySelector('.close');


$youtubeThumbs.addEventListener("click", () => {
  toggleModal();
}, false);

$overlay.addEventListener("click", () => {
  toggleModal();
}, false);

$closeBtn.addEventListener("click", (event)=> {
  event.preventDefault();
  event.stopPropagation();
  toggleModal();
}, false);

const toggleModal = () =>{
  $overlay.classList.contains("is-show") ?
    hideModal():
    showModal()
}

const showModal = () =>{
  $overlay.classList.add("is-show")
  $iframe.src=`${"https://www.youtube.com/embed/" + videoID }`;
}
const hideModal = () =>{
  $overlay.classList.remove("is-show")
  $iframe.src="";
}