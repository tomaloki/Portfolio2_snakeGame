class Sound {
    parent: Element;
    sounds: HTMLAudioElement[];
    muted: boolean;

    constructor(parent: Element) {
        this.parent = parent;
        this.sounds = [];
        this.muted = true;
    }

    create(src: string, id: string, loop: boolean = false) {
        let audio = document.createElement('audio');
        audio.src = src;
        audio.id = id;
        audio.muted = true;
        this.sounds.push(audio);
        this.parent.append(audio);

        if (loop) {
            audio.setAttribute('loop', '');
        }

        return audio;
    }

    soundSetting() {
        let soundItems = document.querySelectorAll('.sound-item');
        soundItems.forEach((soundItem) => {
            soundItem.addEventListener('click', (e) => {
                this.muteToggle();
            });
        });
    }

    muteToggle() {
        if (!this.muted) {
            for (let sound of this.sounds) {
                sound.muted = true;
            }
            document.querySelector('#sound-speaker')!!.innerHTML = '\u{1F507}';
            document.querySelector('#sound-description')!!.innerHTML = 'off';
            this.muted = true;
        } else {
            for (let sound of this.sounds) {
                sound.muted = false;
            }
            document.querySelector('#sound-speaker')!!.innerHTML = '\u{1F509}';
            document.querySelector('#sound-description')!!.innerHTML = 'on';
            this.muted = false;
        }
    }

    pause() {
        for (let sound of this.sounds) {
            sound.pause();
        }
    }

    play() {
        for (let sound of this.sounds) {
            sound.play();
        }
    }
}

const sound = new Sound(document.querySelector('#sound-div')!!);
const backgroundSound = sound.create('../sounds/Bakgrunnsmusikk.mp3', 'background_sound', true);
const eatFoodSound = sound.create('../sounds/snakeEat.mp3', 'finish_sound');
const loseGameSound = sound.create('../sounds/loseLige.mp3', 'finish_sound');
const loseGameSound2 = sound.create('../sounds/loseLife2.mp3', 'finish_sound');
const loseGameSound3 = sound.create('../sounds/loseLife.mp3', 'finish_sound');
const levelUpSound = sound.create('../sounds/levelUp.mp3', 'finish_sound');

const laserSound = sound.create('../sounds/laser.mp3', 'finish_sound');

sound.muteToggle();
sound.soundSetting();

export { levelUpSound, backgroundSound, loseGameSound, laserSound, Sound };
