let player;

window.addEventListener('load', () => {
  const $videoCover= $('#video-cover');
  const $videoTrigger = $('#video-trigger');
  const $videoPlayer = $('#video-player')[0];

  implementYoutubeIframeAPI();

  $videoTrigger.click(() => {
    $videoCover.animate({ opacity: 0 }, 600, () => {
      $videoCover.css('display', 'none');
      player.playVideo();
    })
  })
})

function implementYoutubeIframeAPI() {
  const tag = document.createElement('script');
  const firstScriptTag = document.getElementsByTagName('script')[0];

  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-player', { videoId: 'hfQwaI5b768' });
}
