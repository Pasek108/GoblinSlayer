"use strict";

class Menu {
  constructor() {
    this.contianer = document.querySelector(".menu");

    this.mute = this.contianer.querySelector(".mute");
    this.mute.addEventListener("click", this.toggleMute.bind(this));

    this.options = this.contianer.querySelectorAll(".option");
    this.options.forEach((option) => option.addEventListener("mouseenter", (evt) => this.optionFocus(evt, option)));

    this.option_select_sound = new Audio("Sound/menu_selection.wav");
    this.option_select_sound.volume = 0.7;

    this.menu_music = new Audio("Sound/menu_music.mp3");
    this.menu_music.loop = true;
    window.addEventListener("load", () => this.menu_music.play());

    this.background = new SnowBackground();
    this.background.start();
    this.game = new Game();
    this.achievements = new Achievements();
    this.credits = new Credits();

    this.options[0].addEventListener("click", () => {
      this.background.stop();
      this.game.start();
      this.menu_music.pause();
    });
    this.options[1].addEventListener("click", () => this.achievements.show());
    this.options[2].addEventListener("click", () => this.credits.show());
  }

  show() {
    this.background.start();
    if (!is_sound_muted) this.menu_music.play();
    this.achievements.update();
  }

  toggleMute() {
    const icon = this.mute.firstElementChild;

    if (icon.src.includes("On")) {
      icon.src = icon.src.replace("On", "Off");
      this.menu_music.pause();
      is_sound_muted = true;
    } else {
      icon.src = icon.src.replace("Off", "On");
      this.menu_music.play();
      is_sound_muted = false;
    }
  }

  optionFocus(evt, option) {
    evt.preventDefault();

    this.options.forEach((option) => {
      option.blur();
      option.classList.remove("focused");
    });

    option.focus();
    option.classList.add("focused");

    this.option_select_sound.currentTime = 0;
    if (!is_sound_muted) this.option_select_sound.play();
  }
}

class Achievements {
  constructor() {
    this.contianer = document.querySelector(".achievements");

    this.close_button = this.contianer.querySelector(".close");
    this.close_button.addEventListener("click", this.hide.bind(this));

    this.stats = this.contianer.querySelectorAll(".stats span");
    this.achievements = document.querySelectorAll(".achievement");
    this.achievements_text = document.querySelectorAll(".achievement .text .progress-counter");
    this.achievements_progress = document.querySelectorAll(".achievement .progress");
    this.update();

    setInterval(() => {
      const time_in_game = +localStorage.getItem("time-in-game") + 1;
      localStorage.setItem("time-in-game", `${time_in_game}`);
    }, 60000);
  }

  show() {
    this.contianer.style.bottom = "0px";
  }

  hide() {
    this.contianer.style.bottom = null;
  }

  update() {
    this.stats.forEach((stat) => (stat.innerHTML = localStorage.getItem(stat.className)));

    for (let i = 0; i < this.achievements.length; i++) {
      const required = this.achievements_progress[i].dataset.req;
      const value = localStorage.getItem(this.stats[i].className);

      if (+value >= +required) {
        this.achievements[i].style.borderColor = "#f5bd02";
        this.achievements_text[i].innerHTML = `(${required}/${required})`;
        this.achievements_progress[i].firstChild.style.width = "100%";
      } else {
        this.achievements[i].style.borderColor = null;
        this.achievements_text[i].innerHTML = `(${value}/${required})`;
        this.achievements_progress[i].firstChild.style.width = `${(value * 100) / required}%`;
      }
    }
  }
}

class Credits {
  constructor() {
    this.contianer = document.querySelector(".credits");

    this.close_button = this.contianer.querySelector(".close");
    this.close_button.addEventListener("click", this.hide.bind(this));
  }

  show() {
    this.contianer.style.top = "0px";
  }

  hide() {
    this.contianer.style.top = null;
  }
}

const menu = new Menu();
