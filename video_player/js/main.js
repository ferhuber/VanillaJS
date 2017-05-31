// get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');
const panel = player.querySelector('.player_controls')
const screen = player.querySelector('.screen_button')

function togglePlay() {
  // if(video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '<i class="fa fa-play" aria-hidden="true"></i>' : '<i class="fa fa-pause" aria-hidden="true"></i>'
  toggle.innerHTML = icon;

}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  progress.style.cursor = 'pointer'

}

function showPanel (){
  panel.classList.remove('hide')
  panel.classList.add('show');
}


function hidePanel (){
  panel.classList.add('hide')
}

function fullScreen() {
  icon = document.getElementsByClassName('screen')
  console.log(icon[0].classList.value);
    if (icon[0].classList[2] == 'fa-expand'){
      icon[0].classList.add('fa-compress')
      icon[0].classList.remove('fa-expand')
    }else {
      icon[0].classList.add('fa-expand')
      icon[0].classList.remove('fa-compress')
    }

  player.classList.toggle('full_screen');
  video.classList.toggle('full_screen');
  panel.classList.toggle('full_screen');

}




video.addEventListener ( 'click' , togglePlay );
video.addEventListener ( 'play' , updateButton );
video.addEventListener ( 'pause' , updateButton );
video.addEventListener ( 'timeupdate', handleProgress);
video.addEventListener ( 'mousemove' ,showPanel)
panel.addEventListener ( 'mousemove' ,showPanel)

player.addEventListener ( 'mouseout' , hidePanel)

toggle.addEventListener ( 'click' , togglePlay );

screen.addEventListener ('click' , fullScreen)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);
