const videoID = "mHrjM6oVez0"
const API_KEY = "AIzaSyAFpEcbf6Ojp1hx8vyc8La8wYDejuzM1JA"
const $youtubeThumbs = document.querySelector('.youtube-thumbs');
const $youtubeThumbsImg = document.querySelector('.youtube-thumbsImg');
const $overlay = document.querySelector('.overlay');
const $closeBtn = document.querySelector('.close');

// Youtube Data API の読み込み
fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${API_KEY}&fields=items(id,snippet(channelTitle,title,thumbnails),statistics)&part=snippet,contentDetails,statistics`)
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(function(myJson) {
    const title = myJson.items[0].snippet.title;
    const thumbnails = myJson.items[0].snippet.thumbnails.standard.url
    const viewCount = myJson.items[0].statistics.viewCount
    const likeCount = myJson.items[0].statistics.likeCount

    var div = document.createElement('div');
    div.innerHTML = `<span class="title">${title}</span><br><span class="youtube">Youtube</span> 再生:${viewCount} Like:${likeCount}`;

    $youtubeThumbsImg.src = thumbnails
    $youtubeThumbs.appendChild(div)
  })
  .catch((error) => { 
    $youtubeThumbsImg.src = `http://img.youtube.com/vi/${videoID}/0.jpg`
    console.error('Error:', error) 
  });

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
        playsinline: 1,
        rel:0
      }
    }
  );
  
  $youtubeThumbs.addEventListener("click", (event) => {
    console.log(ytPlayer.getVideoData());
    if (window.matchMedia( "(min-width: 768px)" ).matches) {
      toggleModal();
    } else {
      console.log(event.currentTarget);
      event.currentTarget.classList.add('is-hide')
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