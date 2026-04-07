const videoMap = {
  "seasonsq49payqh": {
    file: "seasonsq49payqh.mp4",
    title: "Stay with me, kitten. Don’t get lost."
  },
  "seasonsv77wtufd": {
    file: "seasonsv77wtufd.mp4",
    title: "In my dreams, there’s always you… and a city full of flowers"
  },
   "fzh414i8psrd1ka": {
    file: "fzh414i8psrd1ka.mp4",
    title: "Just so everyone knows, my heart is already taken."
  }
};

const videoFolder = "./vedio/";

const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const messageLayer = document.getElementById("messageLayer");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const pageTitle = document.getElementById("pageTitle");
const playOverlay = document.getElementById("playOverlay");
const playButton = document.getElementById("playButton");

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageLayer.classList.remove("hidden");
}

function hideMessage() {
  messageLayer.classList.add("hidden");
}

function setTitle(title) {
  const finalTitle = title || "專屬影片播放頁";
  document.title = finalTitle;
  pageTitle.textContent = finalTitle;
}

function initVideo() {
  const key = getUrlParam("v");

  if (!key) {
    setTitle("未提供影片參數");
    showMessage(
      "找不到影片參數"
    );
    return;
  }

  const targetVideo = videoMap[key];

  if (!targetVideo || !targetVideo.file) {
    setTitle("查無對應影片");
    showMessage(
      "查無對應影片",
      "目前沒有這組參數對應的影片，請確認網址參數是否正確。"
    );
    return;
  }

  const finalVideoPath = `${videoFolder}${targetVideo.file}`;

  setTitle(targetVideo.title);
  showMessage("影片載入中", "正在準備影片，請稍候...");

  videoSource.src = finalVideoPath;
  videoPlayer.load();

  videoPlayer.addEventListener(
    "loadeddata",
    () => {
      hideMessage();
    },
    { once: true }
  );

  videoPlayer.addEventListener(
    "error",
    () => {
      showMessage(
        "影片載入失敗",
        `無法讀取影片檔案：${finalVideoPath}`
      );
    },
    { once: true }
  );
}

initVideo();
// 播放按鈕控制
playButton.addEventListener("click", () => {
  videoPlayer.play();
});

// 播放時隱藏按鈕
videoPlayer.addEventListener("play", () => {
  playOverlay.classList.add("hidden");
});

// 暫停時顯示按鈕
videoPlayer.addEventListener("pause", () => {
  playOverlay.classList.remove("hidden");
});

// 初始顯示
videoPlayer.addEventListener("loadeddata", () => {
  playOverlay.classList.remove("hidden");
});
