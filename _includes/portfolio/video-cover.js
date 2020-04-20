$(document).ready(() => {
  const videoCover= $('#video-cover');
  const videoTrigger = $('#video-trigger');
  const videoPlayer = $('#video-player');

  videoTrigger.click(() => {
    videoCover.animate({'opacity' : 0}, 600, () => {
      //$(videoPlayer.attr('src'))?autoplay=1;
      videoCover.css('display', 'none');
    })
  })
})
