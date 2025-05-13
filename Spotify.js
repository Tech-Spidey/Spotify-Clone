let podcast_songs = document.querySelectorAll(".podcast-songs, .top-songs");
let media_player = document.querySelector(".media-player");
let media_player_img = media_player.querySelector(".img");
let song_playing_details = media_player.querySelector(".song-playing");

let song_playing = null;
let interval_id = null;

//Adding buttons when hover on songs
podcast_songs.forEach((song) => {
  song.style.transition = "box-shadow 0.2s ease";

  let img = song.querySelector(".img");

  song.addEventListener("mouseenter", () => {
    song.style.backgroundColor = "#292828"
    song.style.transition = "background-color 0.2s ease";
    let pause_btn = img.querySelector(".fa-pause");
    let play_btn = img.querySelector(".fa-play");
    if (!pause_btn && !play_btn) {
      let play_btn = document.createElement("icon");
      play_btn.setAttribute(
        "style",
        "background-color:rgb(77, 208, 77); height : 2.8rem; width: 2.8rem; display:flex; transition: opacity 0.2s ease ,transform 0.2s ease, background-color 0.2s ease; transform:scale(0); opacity: 0; justify-content:center; align-items:center; border-radius:50%; color: black; margin-right: 5px; margin-bottom: 5px; cursor: pointer"
      );
      play_btn.className = "fa-solid fa-play";

      img.appendChild(play_btn);
      setTimeout(() => {
        play_btn.style.opacity = "1";
        play_btn.style.transform = "scale(1)";
        play_btn.addEventListener("mouseover", () => {
          play_btn.style.transform = "scale(1.1)";
          play_btn.style.backgroundColor = "rgb(110, 222, 110)";
        });
        play_btn.addEventListener("mouseout", () => {
          if (play_btn.className == "fa-solid fa-play") {
            play_btn.style.transform = "scale(1)";
            play_btn.style.backgroundColor = "rgb(77, 208, 77)";
          }
        });
        play_btn.addEventListener("click", () => {
          if (play_btn.className == "fa-solid fa-play") {
            if (song_playing && song_playing != song) {
              let img = song_playing.querySelector(".img");
              let pause_btn = img.querySelector(".fa-solid");
              song_playing.style.boxShadow = "none";
              remove_btn(pause_btn, img);
              stop_playing();
              play_time.value = 0;
              play_time.dispatchEvent(new Event("input"));
            }
            play_btn.className = "fa-solid fa-pause";
            if (media_control_buttons.querySelector(".fa-play")) {
              media_control_buttons.querySelector(".fa-play").className =
                "fa-solid fa-pause enlarge-options media-play-pause-button";
            }
            song_playing = song;
            song.style.boxShadow = "0px 0px 10px rgb(122, 224, 122)";
            media_player_img.style.backgroundImage = img.style.backgroundImage;
            media_player_img.style.backgroundSize = "cover";
            media_player_img.style.backgroundPosition = "center";
            song_playing_details
              .querySelector(".details")
              .querySelector(".song").innerText = song
              .querySelector(".img-detail")
              .querySelector(".song").innerText;
            song_playing_details
              .querySelector(".details")
              .querySelector(".song-detail").innerText = song
              .querySelector(".img-detail")
              .querySelector(".song-detail").innerText;
              start_playing();
          } else {
            play_btn.className = "fa-solid fa-play";
            media_control_buttons.querySelector(".fa-pause").className =
              "fa-solid fa-play enlarge-options media-play-pause-button";
              stop_playing();
          }
        });
      }, 50);
    }
  });
  song.addEventListener("mouseleave", () => {
    if (song_playing != song) {
      let play_btn = img.querySelector(".fa-play");
      remove_btn(play_btn, img);
    }
    song.style.backgroundColor = "transparent";
  });

  function remove_btn(btn, img) {
    btn.style.opacity = "0";
    btn.style.transform = "scale(0)";
    setTimeout(() => {
      img.removeChild(btn);
    }, 100);
  }
});

//Play-Pause button in media control
let media_control_buttons = media_player.querySelector(".control-buttons");
let media_play_pause_button = media_control_buttons.querySelector(
  ".media-play-pause-button"
);
media_play_pause_button.addEventListener("click", () => {
  if (
    media_play_pause_button.className ==
    "fa-solid fa-pause enlarge-options media-play-pause-button"
  ) {
    media_play_pause_button.className =
      "fa-solid fa-play enlarge-options media-play-pause-button";
    let play_btn = song_playing
      .querySelector(".img")
      .querySelector(".fa-pause");
    play_btn.className = "fa-solid fa-play";
    stop_playing();
  } else if (song_playing) {
    media_play_pause_button.className =
      "fa-solid fa-pause enlarge-options media-play-pause-button";
    let play_btn = song_playing.querySelector(".img").querySelector(".fa-play");
    play_btn.className = "fa-solid fa-pause";
    start_playing();
  }
});

function start_playing(){
  interval_id = setInterval(() => {
    if(play_time.value == play_time.max){
      console.log("song completed");
      stop_playing();
      setTimeout(() => {
        forward_step.dispatchEvent(new Event("click"));
      }, 100);
    }
    play_time.value = Number(play_time.value) + 1;
    console.log(play_time.value);
    play_time.dispatchEvent(new Event("input"));
  }, 1000);
}

function stop_playing(){
  clearInterval(interval_id);
  console.log("stop playing");
  interval_id = null;
}

//Progress bar in media control
let play_bar = document.querySelector(".play-bar");
let play_time = document.querySelector("#play-time");
let current_play_time = document.querySelector(".current-play-time");
let total_play_time = document.querySelector(".total-play-time");
let root_font = parseFloat(getComputedStyle(document.documentElement).fontSize);

play_time.addEventListener("input", () => {
  console.log("input triggered");
  let input_value = play_time.value;
  let curr_time_min = Math.floor(input_value / 60);
  let curr_time_sec = input_value % 60;
  let curr_time = `${curr_time_min}:`;
  if (curr_time_sec < 10) {
    curr_time += "0" + curr_time_sec;
  } else {
    curr_time += curr_time_sec;
  }
  current_play_time.innerText = curr_time;

  let progress_bar_fill = play_bar.querySelector(".progress-bar-fill");
  let total_width = play_time.offsetWidth - Math.floor(0.5 * root_font);
  let fill_width =
    Math.floor(0.4 * root_font) +
    Math.floor((total_width / Number(play_time.max)) * Number(input_value));
  progress_bar_fill.style.width = `${fill_width}px`;
});

// Volume bar in media control
let volume_bar = document.querySelector(".volume-bar");
let volume = document.querySelector("#volume");

volume.addEventListener("input", () => {
  let input_value = volume.value;
  let progress_bar_fill = volume_bar.querySelector(".progress-bar-fill");
  let total_width = volume.offsetWidth - Math.floor(0.5 * root_font);
  let fill_width =
    Math.floor(0.4 * root_font) +
    Math.floor((total_width / 100) * Number(input_value));
  progress_bar_fill.style.width = `${fill_width}px`;
});

//Next and previous song buttons in media control
let forward_step = media_control_buttons.querySelector(".fa-forward-step");
let backward_step = media_control_buttons.querySelector(".fa-backward-step");

forward_step.addEventListener("click", () => {
  if (song_playing) {
    next_song(song_playing, 1);
  }
});

backward_step.addEventListener("click", () => {
  if (song_playing) {
    next_song(song_playing, -1);
  }
});

function next_song(song_playing, num) {
  let song_index = Array.from(podcast_songs).indexOf(song_playing);
  if (song_index == podcast_songs.length - 1 && num == 1) {
    song_index = -1;
  }
  if (song_index == 0 && num == -1) {
    song_index = podcast_songs.length;
  }
  podcast_songs[song_index + num].dispatchEvent(new Event("mouseenter"));
  setTimeout(() => {
    podcast_songs[song_index + num]
      .querySelector(".img")
      .querySelector(".fa-play")
      .dispatchEvent(new Event("click"));
  }, 50);
  play_time.value = 0;
  play_time.dispatchEvent(new Event("input"));
}


let root_element = document.documentElement;
let root_style = getComputedStyle(root_element).fontSize;
console.log(root_style);
root_element.style.fontSize = "16px";