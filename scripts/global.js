// Audio
let musicVol = 1;
let sfxVol = 1;

const shuffle = new Audio("./sfx/shuffle.wav");
shuffle.volume = sfxVol;

const notiSound = new Audio("./sfx/noti.wav");
notiSound.volume = sfxVol;

const jazzBackground = new Audio("./sfx/wJazz.mp3");
const jazzMult = 0.05;
jazzBackground.volume = musicVol * jazzMult;
jazzBackground.loop = true;
