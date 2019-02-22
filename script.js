const videoID = "mHrjM6oVez0"
const $youtubeThumbs = document.querySelector('.youtube-thumbs');
const $overlay = document.querySelector('.overlay');
const $closeBtn = document.querySelector('.close');

// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
  const ytPlayer = new YT.Player(
    'target', { 
      width: 640,
      height: 390,
      videoId: videoID,
      playerVars: {
        playsinline: 1
      }
    }
  );
  $youtubeThumbs.addEventListener("click", (event) => {
    if (window.matchMedia( "(min-width: 768px)" ).matches) {
      toggleModal();
    } else {
      event.target.classList.add('is-hide')
      ytPlayer.playVideo();
    }
  }, false);

  $overlay.addEventListener("click", () => {
    toggleModal();
  }, false);

  $closeBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    event.stopPropagation();
    toggleModal();
  }, false);

  let modalYtPlayer = new YT.Player(
    'modalTarget', { 
      width: 640,
      height: 390,
      videoId: videoID
    }
  );
  const toggleModal = () => {
    $overlay.classList.contains("is-show") ?
      hideModal(ytPlayer):
      showModal(ytPlayer)
  }
  const showModal = () =>{
    $overlay.classList.add("is-show")
  }
  const hideModal = () =>{
    modalYtPlayer.stopVideo();
    $overlay.classList.remove("is-show")
  }
}