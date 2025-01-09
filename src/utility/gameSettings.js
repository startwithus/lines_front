// // soundSettings.js
// import { Howl, Howler } from "howler";
// import BgMusic from "../sound/bgloop.mp3";
// import PlaceBetSound from "../sound/placebet.mp3";
// import CashoutAudio from "../sound/win.mp3";
// import RideSound from "../sound/ride.mp3";

// let bgMusic;
// let placeBetSound;
// let cashoutSound;
// let carRideSound;
// let sound = true;

// export function loadSounds() {
//   bgMusic = new Howl({
//     src: [BgMusic],
//     html5: false,
//     volume: 0.5,
//     loop: true,
//     onloaderror: (error) => { },
//     onload: () => { },
//     onplayerror: (error) => { },
//   });

//   placeBetSound = new Howl({
//     src: [PlaceBetSound],
//     html5: false,
//     volume: 1,
//     loop: false,
//     onloaderror: (error) => { },
//     onload: () => { },
//     onplayerror: (error) => { },
//   });

//   cashoutSound = new Howl({
//     src: [CashoutAudio],
//     html5: false,
//     volume: 1,
//     loop: false,
//     onloaderror: (error) => { },
//     onload: () => { },
//     onplayerror: (error) => { },
//   });


//   carRideSound = new Howl({
//     src: [RideSound],
//     html5: false,
//     volume: 0.7,
//     loop: false,
//     onloaderror: (error) => { },
//     onload: () => { },
//     onplayerror: (error) => { },
//   });

// }
// export function setBgMusicVolume(volume) {
//   if (bgMusic) {
//     bgMusic.volume(volume);
//   }
// }
// export function setSoundVolume(volume) {
//   if (placeBetSound) placeBetSound.volume(volume);
//   if (cashoutSound) cashoutSound.volume(volume);
//   if (carRideSound) carRideSound.volume(volume);
// }
// export function playBgMusic() {
//   if (bgMusic && !bgMusic.playing()) {
//     bgMusic.play();
//   }
// }

// export function pauseBgMusic() {
//   if (bgMusic && bgMusic.playing()) {
//     bgMusic.pause();
//   }
// }




// export function playBetSound() {
//   if (placeBetSound && !placeBetSound.playing()) {
//     placeBetSound.play();
//   }
// }

// export function pauseBetSound() {
//   if (placeBetSound && placeBetSound.playing()) {
//     placeBetSound.pause();
//   }
// }

// export function playCashoutSound() {
//   if (cashoutSound && !cashoutSound.playing()) {
//     cashoutSound.play();
//   }
// }

// export function pauseCashoutSound() {
//   if (cashoutSound && cashoutSound.playing()) {
//     cashoutSound.pause();
//   }
// }

// export function playRide() {
//   if (carRideSound && !carRideSound.playing()) {
//     carRideSound.play();
//   }
// }

// export function pauseRide() {
//   if (carRideSound && carRideSound.playing()) {
//     carRideSound.pause();
//   }
// }



// export function playSound() {
//   if (sound) {
//     placeBetSound.mute(false);
//     cashoutSound.mute(false);
//     carRideSound.mute(false);
//   }
// }

// export function pauseSound() {
//   placeBetSound.mute(true);
//   cashoutSound.mute(true);
//   carRideSound.mute(true);
// }



// export const setMuted = (muted) => {
//   Howler.mute(muted);
// };

// loadSounds();
