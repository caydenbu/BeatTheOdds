// Audio
let musicVol = 1;
let sfxVol = 1;

const shuffle = new Audio("./sfx/shuffle.wav");
shuffle.volume = sfxVol;

const notiSound = new Audio("./sfx/noti.wav");
notiSound.volume = sfxVol;

const sparkle = new Audio("./sfx/sparkle.wav");
sparkle.volume = sfxVol;

const swoosh = new Audio("./sfx/swoosh.mp3");
swoosh.volume = sfxVol * 0.7;

const jazzBackground = new Audio("./sfx/wJazz.mp3");
const jazzMult = 0.01;
jazzBackground.volume = musicVol * jazzMult;
jazzBackground.loop = true;
