<script setup lang="ts">
import { ref } from "vue";
import { IPlayerParams, IPlayerProvider } from "./types";
import { reactive } from "vue";
import Loader from "./components/loader.vue";
import { provide } from "vue";
import PlayerProgressiveBar from "./components/PlayerProgressiveBar.vue";
import { onMounted } from "vue";
import Hls from "hls.js";
import PlBtn from "./components/PlBtn.vue";
import { usePlayer } from "./player";
import { SettingsIcon } from "vue-tabler-icons";
import Quality from "./widgets/Quality.vue";
import Track from "./widgets/Track.vue";
import SettingsModal from "./widgets/SettingsModal.vue";
import { watch } from "vue";

const { secondsToHms, isMobile } = usePlayer();

interface IProps {
  isShort?: boolean;
}

const props = defineProps<IProps>();

const emits = defineEmits(["changeVolume", "playPause", "handleFullScreen", "setPip", "exitPip", "changeSize"]);

const videoContainer = ref<HTMLDivElement | null>(null);
const midContainer = ref<HTMLDivElement | null>(null);
const videoElement = ref<HTMLVideoElement | null>(null);
let timeout_of_progress: ReturnType<typeof setTimeout>;
let time_out_of_overlay: ReturnType<typeof setTimeout>;
let changeVideoTimeOnClick_timer: ReturnType<typeof setTimeout>;
let paused_timer: ReturnType<typeof setTimeout>;

let hls: Hls | null;

const params: IPlayerParams = reactive({
  loading: false,
  paused: true,
  currentTime: 0,
  duration: 0,
  canPlay: 0,
  volume: 0.5,
  fullScreen: false,
  activeLevel: -1,
  activeTrack: 0,
  audioTracks: [],
  levels: [],
  isSettings: false,
  overlay: false,
  secondaryActiveLevel: null,
  secondaryActiveTrack: null
});

const launchVideo = () => {
  if (Hls.isSupported()) {
    hls = new Hls({
      debug: false,
      lowLatencyMode: true,
      enableWorker: false,
      maxBufferSize: 10 * 1000 * 1000,
      startLevel: 0
    });

    if (hls) {
      if (videoElement.value) {
        hls.attachMedia(videoElement.value);
        hls.loadSource("https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8");
        if (videoElement.value.paused) {
          videoElement.value.play();
        }

        setTimeout(() => {
          getVideoParams();
        }, 0);
      }
    }
  }
};

const getVideoParams = () => {
  if (hls) {
    hls.on(Hls.Events.MANIFEST_PARSED, async () => {
      setTimeout(() => {
        if (hls?.audioTracks) {
          params.audioTracks = hls?.audioTracks;
        }
        if (hls?.levels) {
          const levels = [];
          levels.push(...hls.levels);

          params.levels = levels.sort((a, b) => {
            if (a.height < b.height) {
              return 1;
            }
            if (a.height > b.height) {
              return -1;
            }
            return 0;
          });
        }

        if (hls) {
          hls.on(Hls.Events.LEVEL_SWITCHED, async () => {
            if (hls) {
              console.log();
              // params.activeLevel = params.levels.findIndex((el) => el.height == (hls && hls.levels[hls.currentLevel].height));
            }
          });
          hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, async () => {
            if (hls) {
              params.activeTrack = hls?.audioTrack;
            }
          });
        }
      });
    });
  }
};

const videoTimeUpdate = () => {
  try {
    if (videoElement.value && videoElement.value.duration > 0) {
      params.loading = false;
      params.currentTime = videoElement.value.currentTime;
      params.duration = videoElement.value.duration;

      if (videoElement.value.buffered && videoElement.value.buffered.length) {
        for (let d_i = 0; d_i < videoElement.value.buffered.length; d_i++) {
          if (videoElement.value.buffered.start(videoElement.value.buffered.length - 1 - d_i) < videoElement.value.currentTime) {
            params.canPlay = videoElement.value.buffered.end(videoElement.value.buffered.length - 1 - d_i) / videoElement.value.duration;
            break;
          }
        }
      }

      if (videoElement.value.readyState !== 4) {
        checkLoad();
      }
    }
  } catch (e) {
    params.loading = true;
  }
};

const checkLoad = () => {
  if (timeout_of_progress) clearTimeout(timeout_of_progress);
  timeout_of_progress = setTimeout(() => {
    if (videoElement.value) {
      if (videoElement.value.readyState >= 3) {
        params.loading = false;
      } else {
        params.loading = true;
      }
    }
  }, 10);
};

const playPause = () => {
  if (videoElement.value) {
    videoElement.value.paused ? videoElement.value.play() : videoElement.value.pause();
    params.paused = videoElement.value.paused;
  }
};

const updateVolume = () => {
  if (videoElement.value) {
    videoElement.value.volume = params.volume;
  }
};

const setPictureInPicture = () => {
  if (videoElement.value) {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      videoElement.value.removeEventListener("leavepictureinpicture", exitPip);
    } else if (document.pictureInPictureEnabled) {
      videoElement.value.requestPictureInPicture();
      videoElement.value.addEventListener("leavepictureinpicture", exitPip);
    }
  }
};

const exitPip = () => {
  if (paused_timer) clearTimeout(paused_timer);
  paused_timer = setTimeout(() => {
    if (videoElement.value && videoElement.value.paused) {
      playPause();
    }
  }, 500);
};

const handleFullScreen = () => {
  if (isMobile.iOS()) {
    if (videoElement.value) {
      videoElement.value.removeAttribute("playsinline");
      videoElement.value.pause();
      playPause();
    }
    if (videoElement.value) {
      videoElement.value.setAttribute("playsinline", "true");
      playPause();
      videoElement.value.play();
    }
    return;
  }

  params.fullScreen = !params.fullScreen;
  if (params.fullScreen) {
    if (videoContainer.value) {
      if (videoContainer.value.requestFullscreen) {
        videoContainer.value.requestFullscreen();
        // @ts-ignore
      } else if (videoInject.videoContainer.webkitRequestFullscreen) {
        // @ts-ignore
        videoInject.videoContainer.webkitRequestFullscreen();
        // @ts-ignore
      } else if (videoInject?.videoContainer.msRequestFullscreen) {
        // @ts-ignore
        videoInject?.videoContainer.msRequestFullscreen();
      }
    }
    if (screen) {
      // @ts-ignore
      window.screen.orientation["lock"]("landscape-primary")
        .then(() => {})
        .catch(function () {
          return;
        });
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
    }
  }
};

const updateIsSettings = (val: boolean) => {
  params.isSettings = val;
};

const changeSize = () => {
  emits("changeSize", !props.isShort);
};

const setLevel = (item: any, index: number) => {
  if (hls) {
    if (index == -1) {
      params.activeLevel = -1;
      hls.currentLevel = -1;
      hls.capLevelToPlayerSize = true;
      return;
    }
    const selectedItemIndex = hls.levels.indexOf(hls.levels.find((el) => el.height == item) || item);
    params.activeLevel = index;
    console.log(item)
    hls.currentLevel = selectedItemIndex;
  }
};
const setTrack = (index: number) => {
  if (hls) {
    hls.audioTrack = index;
    params.activeTrack = index;
  }
};

const playerProvides: IPlayerProvider = {
  videoElement: videoElement.value,
  playPause: playPause,
  params: params,
  setLevel: setLevel,
  setTrack: setTrack
};

provide("videoPlayer", playerProvides);

const handleOverlay = () => {
  if (time_out_of_overlay) clearTimeout(time_out_of_overlay);
  params.overlay = false;
  time_out_of_overlay = setTimeout(() => {
    params.overlay = true;
  }, 5000);
};

const changeVideoTimeOnClick = (dir: number) => {
  if (videoElement.value) {
    // let time: number = (params.currentTime += dir);
    // params.isProgressive = true;
    params.currentTime += dir;
    videoElement.value.currentTime += dir;
    if (videoElement.value && !videoElement.value.paused) {
      playPause();
    }
    if (changeVideoTimeOnClick_timer) clearTimeout(changeVideoTimeOnClick_timer);

    changeVideoTimeOnClick_timer = setTimeout(() => {
      if (videoElement.value) {
        // video.value.currentTime = time;
        if (videoElement.value && videoElement.value.paused) {
          playPause();
        }
        // params.isProgressive = false;
      }
    }, 200);
  }
};

const updateValues = () => {
  if (params.secondaryActiveLevel !== null) {
    setLevel(params.secondaryActiveLevel.text, params.secondaryActiveLevel.value);
    params.secondaryActiveLevel = null;
  }

  if (params.secondaryActiveTrack != null) {
    setTrack(params.secondaryActiveTrack);
    params.secondaryActiveTrack = null;
  }

  params.isSettings = false;
};

let audio_vol;
const handleKeyController = (event: KeyboardEvent) => {
  switch (event.code) {
    case "Space":
      playPause();
      return;

    case "ArrowRight":
      return changeVideoTimeOnClick(10);
    case "ArrowLeft":
      return changeVideoTimeOnClick(-10);
    case "ArrowUp":
      if (videoElement.value) {
        audio_vol = videoElement.value.volume;
        if (audio_vol != 1) {
          try {
            videoElement.value.volume = audio_vol + 0.1;
          } catch (err) {
            videoElement.value.volume = 1;
          }
        }
      }
      break;

    case "ArrowDown":
      if (videoElement.value) {
        audio_vol = videoElement.value.volume;
        if (audio_vol != 0) {
          try {
            videoElement.value.volume = audio_vol - 0.1;
          } catch (err) {
            videoElement.value.volume = 0;
          }
        }
      }
  }
};

const disableScroll = () => {
  // To get the scroll position of current webpage
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };

  document.body.setAttribute("style", "pointer-events: none");
};
const enableScroll = () => {
  window.onscroll = function () {};
  document.body.setAttribute("style", "");
};

watch(
  () => params.isSettings,
  (val) => {
    if (val) {
      if (isMobile.any()) {
        disableScroll();
      }
    } else {
      enableScroll();
    }
  }
);

onMounted(() => {
  launchVideo();
  updateVolume();
  playerProvides.videoElement = videoElement.value;
  window.addEventListener("keydown", handleKeyController);
  if (props.isShort) {
  }

  if (videoElement.value) {
    videoElement.value.addEventListener("playing", () => {
      params.paused = false;
    });
    videoElement.value.addEventListener("pause", () => {
      params.paused = true;
    });
  }

  if (videoContainer.value) {
    videoContainer.value.addEventListener("focusin", () => {});
    videoContainer.value.addEventListener("focusout", () => {});

    if (window.matchMedia("(pointer: coarse)").matches) {
      videoContainer.value.addEventListener("touchmove", handleOverlay);
    } else {
      videoContainer.value.addEventListener("mousemove", handleOverlay);
      if (midContainer.value) {
        midContainer.value.addEventListener("click", playPause);
      }
    }
    videoContainer.value.addEventListener("click", handleOverlay);
  }
});
</script>

<template>
  <button
    class="webase-player"
    ref="videoContainer"
    id="player"
    :class="{
      playing: !params.paused
    }"
  >
    <div
      class="video-element"
      :class="{
        long: !!isShort
      }"
    >
      <div class="video-element-container">
        <video
          ref="videoElement"
          @progress="videoTimeUpdate"
          @timeupdate="videoTimeUpdate"
          @waiting="checkLoad"
          @canplay="checkLoad"
          playsinline
        ></video>
      </div>
    </div>
    <Loader v-if="params.loading" />
    <div
      class="interface"
      :style="{
        opacity: params.overlay ? 0 : 1
        // pointerEvents: params.loading ? 'none' : ''
      }"
    >
      <div class="top"></div>
      <div class="mid" ref="midContainer"></div>
      <div class="bottom">
        <PlayerProgressiveBar
          :style="{
            opacity: params.isSettings ? 0 : 1,
            transition: 'all .4s',
            pointerEvents: params.isSettings ? 'none' : 'all'
          }"
        />
        <div class="bottom-controls">
          <div class="left-collapse">
            <PlBtn class="icon-size" @click="playPause">
              <div class="icon-size-inner">
                <svg v-if="params.paused" width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    data-v-ebb1e6b8=""
                    d="M2.25926 17.7498C1.76543 18.0644 1.26519 18.0823 0.758519 17.8035C0.25284 17.5256 0 17.0963 0 16.5154V1.48502C0 0.904131 0.25284 0.474277 0.758519 0.195453C1.26519 -0.0824035 1.76543 -0.0640087 2.25926 0.250637L14.3333 7.76583C14.7778 8.05627 15 8.46773 15 9.00021C15 9.53268 14.7778 9.94414 14.3333 10.2346L2.25926 17.7498Z"
                    fill="white"
                  ></path>
                </svg>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                  <path
                    d="M2.66667 19.3337C4.13333 19.3337 5.33333 18.1337 5.33333 16.667V3.33366C5.33333 1.86699 4.13333 0.666992 2.66667 0.666992C1.2 0.666992 0 1.86699 0 3.33366V16.667C0 18.1337 1.2 19.3337 2.66667 19.3337ZM10.6667 3.33366V16.667C10.6667 18.1337 11.8667 19.3337 13.3333 19.3337C14.8 19.3337 16 18.1337 16 16.667V3.33366C16 1.86699 14.8 0.666992 13.3333 0.666992C11.8667 0.666992 10.6667 1.86699 10.6667 3.33366Z"
                    fill="#F9F9F9"
                  />
                </svg>
              </div>
            </PlBtn>
            <div class="volume" v-if="!isMobile.any()">
              <PlBtn class="icon-size volume-icon" @click="playPause">
                <div class="icon-size-inner">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ltr-4z3qvp e1svuwfo1"
                    data-name="VolumeHigh"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </PlBtn>

              <input
                @input="updateVolume"
                v-model="params.volume"
                min="0"
                max="1"
                step="0.01"
                type="range"
                :style="{
                  background: `linear-gradient(to right, var(--primary) 0% , var(--primary) ${
                    params.volume == 0.5 ? 50 : params.volume * 100
                  }%  , var(--player-progressive-bar-background) 0%,var(--player-progressive-bar-background) 100%)`
                }"
              />
            </div>
            <div class="video-time">
              <span> {{ secondsToHms(params.currentTime) }} </span>/
              <span> {{ secondsToHms(params.duration) }} </span>
            </div>
          </div>
          <div class="right-collapse">
            <PlBtn class="icon-size" v-if="(params.audioTracks.length || params.levels.length) && !isMobile.any()" @click="params.isSettings = true">
              <div class="icon-size-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"
                  />
                </svg>
              </div>
            </PlBtn>
            <PlBtn class="icon-size" @click="setPictureInPicture">
              <div class="icon-size-inner">
                <svg viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.5455 8.88889H12C11.4 8.88889 10.9091 9.38889 10.9091 10V14.4444C10.9091 15.0556 11.4 15.5556 12 15.5556H18.5455C19.1455 15.5556 19.6364 15.0556 19.6364 14.4444V10C19.6364 9.38889 19.1455 8.88889 18.5455 8.88889ZM24 17.7778V2.2C24 0.977778 23.0182 0 21.8182 0H2.18182C0.981818 0 0 0.977778 0 2.2V17.7778C0 19 0.981818 20 2.18182 20H21.8182C23.0182 20 24 19 24 17.7778ZM20.7273 17.8H3.27273C2.67273 17.8 2.18182 17.3 2.18182 16.6889V3.3C2.18182 2.68889 2.67273 2.18889 3.27273 2.18889H20.7273C21.3273 2.18889 21.8182 2.68889 21.8182 3.3V16.6889C21.8182 17.3 21.3273 17.8 20.7273 17.8Z"
                    fill="#F9F9F9"
                  />
                </svg>
              </div>
            </PlBtn>
            <PlBtn class="icon-size" @click="changeSize">
              <div class="icon-size-inner">
                <svg v-if="isShort" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M78.0953 3.21631V36.7836H1.90479V3.21631H78.0953ZM9.52383 8.01163H70.4762V31.9882H9.52383V8.01163Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M78.0953 3.21631V36.7836H1.90479V3.21631H78.0953ZM9.52383 8.01163H70.4762V31.9882H9.52383V8.01163Z"
                    fill="white"
                  />
                </svg>

                <svg v-else width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M54.6668 3.21631V36.7836H1.3335V3.21631H54.6668ZM6.66683 8.01163H49.3335V31.9882H6.66683V8.01163Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M54.6668 3.21631V36.7836H1.3335V3.21631H54.6668ZM6.66683 8.01163H49.3335V31.9882H6.66683V8.01163Z"
                    fill="white"
                  />
                </svg>
              </div>
            </PlBtn>
            <PlBtn class="icon-size" @click="handleFullScreen">
              <div class="icon-size-inner">
                <svg
                  v-if="params.fullScreen"
                  class="exit-full"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.07143 19V14.9286H0V12.2143H6.78571V19H4.07143ZM12.2143 19V12.2143H19V14.9286H14.9286V19H12.2143ZM0 6.78571V4.07143H4.07143V0H6.78571V6.78571H0ZM12.2143 6.78571V0H14.9286V4.07143H19V6.78571H12.2143Z"
                    fill="currentColor"
                  />
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" class="full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </PlBtn>
          </div>

          <template v-if="!isMobile.any()">
            <Transition name="fade">
              <SettingsModal v-if="params?.isSettings" @update:is-settings="updateIsSettings" />
            </Transition>
          </template>
        </div>
      </div>
    </div>
    <div class="wing-controls" v-if="isMobile.any()">
      <div class="icon-size">
        <SettingsIcon @click="params.isSettings = true" />
      </div>
      <Teleport to="body">
        <div class="wing-controls__modal" v-if="params.isSettings">
          <div class="wing-controls__modal-inner">
            <Quality style="margin-bottom: 1.25rem" />
            <Track />

            <div class="btns">
              <button class="btn btn-cancel" @click="params.isSettings = false">
                {{ $t("Cancel") }}
              </button>
              <button class="btn btn-search" @click="updateValues">
                {{ $t("Save") }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </button>
</template>
<style>
::cue {
  font-size: 0;
}
</style>

<style lang="scss">
#player {
  --player-progressive-bar-background: rgba(255, 255, 255, 0.2);
  --player-progressive-bar-updated-time: rgba(255, 255, 255, 0.2);
  --primary: #05b187;
  --pm-radius: 1.25rem;
  --btn-padding: 0.625rem 1.25rem;
  --btn-border-radius: 0.375rem;
}
.wing-controls__modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100000;
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  --player-progressive-bar-background: rgba(255, 255, 255, 0.2);
  --player-progressive-bar-updated-time: rgba(255, 255, 255, 0.2);
  --primary: #05b187;
  --pm-radius: 1.25rem;
  --btn-padding: 0.625rem 1.25rem;
  --btn-border-radius: 0.375rem;
  font-size: 20px;

  pointer-events: all;
  &-inner {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background: #fff;
    border-radius: 0.5rem;
    flex: 0 0 700px;

    @media screen and (max-width: 600px) {
      flex: 0 0 100%;
    }

    .mobile-items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      min-width: 18.75rem;
      label {
        margin-bottom: 0.625em;
        font-weight: 600;
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      gap: 0.3125rem;
      margin-top: 1.25rem;

      .btn {
        font-size: 1rem;
        line-height: 1.2;
        padding: var(--btn-padding);
        border-radius: var(--btn-border-radius);
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
        &-cancel {
          background: #ebeef0;
          color: #8592a3;
          transition: background 0.4s;
        }
        &-search {
          background: var(--primary);
          color: #fff;
          transition: background 0.4s;
          &:disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    font-size: 16px;
  }
}
</style>
<style lang="scss" scoped>
.webase-player {
  position: relative;
  width: 100%;
  border-radius: 1.5em;
  overflow: hidden;
  z-index: 888;
  background: #000;
  outline: transparent;
  --index: calc(1vw + 1vh);
  font-size: calc(min(var(--index) * 0.545, 16px));

  .video-element {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;

    &.long {
      width: 75%;
    }
    .video-element-container {
      position: relative;
      height: 0;
      padding-bottom: 56.25%;
      width: 100%;
      margin: 0 auto;
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      object-fit: cover;
    }
  }

  .wing-controls {
    position: absolute;
    right: 0;
    top: 10%;
    background: #fff;
    padding: 0.5em;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    z-index: 41;
  }
  .interface {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.4s;
    z-index: 40;

    .top {
      padding: 1em 2em;
      display: flex;
      justify-content: space-between;
    }

    .mid {
      flex: 1;
      cursor: pointer;
    }

    .bottom {
      display: flex;
      flex-direction: column;
      padding: 0.5em 1em;
      gap: 0.625em;
      background: linear-gradient();
      &-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .left-collapse {
          display: flex;
          align-items: center;
          gap: 0.625em;
        }
        .right-collapse {
          display: flex;
          align-items: center;
          gap: 0.625em;
        }
      }
      .icon-size {
        display: flex;
        justify-content: center;
        align-items: center;
        // background: rgba(255, 255, 255, 0.2);
        padding: 0.5em;
        border-radius: 50%;
        transition: all 0.4s;
        &-inner {
          width: 1.5em;
          height: 1.5em;
          position: relative;
          svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }

      .video-time {
        display: flex;
        align-items: center;
        white-space: nowrap;
        color: #fff;
        gap: 0.125rem;
      }

      .volume {
        display: flex;
        align-items: center;
        gap: 0.5em;
        overflow: hidden;

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0.375em;
          position: relative;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s;

          &::-webkit-slider-thumb {
            appearance: none;
            -webkit-appearance: none;
            width: 0.75em;
            height: 0.75em;
            border: none;
          }

          &::-moz-range-thumb {
            appearance: none;
            -webkit-appearance: none;
            background: var(--primary);
            width: 0.75em;
            height: 0.75em;
            border: none;
            border-radius: 0;
          }

          &::-webkit-slider-runnable-track {
            appearance: none;
            -webkit-appearance: none;
            width: 0.75em;
            height: 0.75em;
          }
        }

        &:hover {
          input {
            transform: translateX(0);
            width: 5em;
            pointer-events: all;
            opacity: 1;
          }
        }
      }
    }

    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
