const container = document.querySelector(".container");
const image = document.querySelector("#ayet-image");
const title = document.querySelector("#ayet-details .title");
const reciter = document.querySelector("#ayet-details .reciter");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");
const player = new AyetPlayer(ayetList);

window.addEventListener("load", () => {
  let ayet = player.getAyet();
  displayAyet(ayet);
  displayAyetlist(player.ayetList);
  isPlayingNow();
});

function displayAyet(ayet) {
  title.innerText = ayet.getName();
  reciter.innerText = ayet.reciter;
  image.src = "img/" + ayet.img;
  audio.src = "mp3/" + ayet.file;
}

play.addEventListener("click", () => {
  const isAyetPlay = container.classList.contains("playing");
  isAyetPlay ? pauseAyet() : playAyet();
});

prev.addEventListener("click", () => {
  prevAyet();
});

next.addEventListener("click", () => {
  nextAyet();
});

const prevAyet = () => {
  player.prev();
  let ayet = player.getAyet();
  displayAyet(ayet);
  playAyet();
  isPlayingNow();
};

const nextAyet = () => {
  player.next();
  let ayet = player.getAyet();
  displayAyet(ayet);
  playAyet();
  isPlayingNow();
};

const pauseAyet = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};
const playAyet = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};
const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});
let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayAyetlist = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `<li li-index='${i}' onclick="selectedAyet(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="ayet-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="ayet-${i}" src="mp3/${list[i].file}"></audio>
        </li>`;
    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#ayet-${i}`);
    let liAudioTag = ul.querySelector(`.ayet-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedAyet = (li) => {
  player.index = li.getAttribute("li-index");
  displayAyet(player.getAyet());
  playAyet();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended",() => {
  nextAyet();
})