let podcast_songs = document.querySelectorAll(".podcast-songs, .top-songs");
podcast_songs.forEach((song) => {
  let img = song.querySelector(".img");

  song.addEventListener("mouseenter", () => {
    let play_btn = document.createElement("icon");
    play_btn.setAttribute(
      "style",
      "background-color:rgb(77, 208, 77); height : 45px; width: 45px; display:flex; transition: opacity 0.2s ease ,transform 0.2s ease, background-color 0.2s ease; transform:scale(0); opacity: 0; justify-content:center; align-items:center; border-radius:50%; color: black; margin-right: 5px; margin-bottom: 5px;"
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
        play_btn.style.transform = "scale(1)";
        play_btn.style.backgroundColor = "rgb(77, 208, 77)";
      });
    }, 50);


  });
  song.addEventListener("mouseleave", () => {
    let play_btn = img.querySelector(".fa-solid");
    img.removeChild(play_btn);
  });
});
