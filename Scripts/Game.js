"use strict";

class Goblin {
  constructor(canvas_w, canvas_h, id, side, speed) {
    this.img = new Image();
    this.img.src = "Images/goblin.png";
    this.size = { w: 65, h: 80 };
    this.pos = { x: 0, y: canvas_h - 185 };
    this.side = side;
    this.speed = speed;
    this.frame = 0;
    this.killed = false;

    this.death_sound = new Audio("Sound/goblin_death.mp3");
    if (is_sound_muted) this.death_sound.volume = 0;
    else this.death_sound.volume = 0.7;

    if (this.side) {
      this.pos.x = -canvas_w / 2 - id * (400 - this.speed * 17);
      this.old_x = -canvas_w / 2;
    } else {
      this.pos.x = canvas_w / 2 + id * (400 - this.speed * 17);
      this.old_x = canvas_w / 2;
    }
  }

  draw(ctx) {
    if (this.killed) return;
    ctx.drawImage(this.img, this.side * 160 + this.frame * 80, 0, 80, 90, this.pos.x, this.pos.y, this.size.w, this.size.h);

    if (this.side) {
      this.pos.x += this.speed;

      if (this.pos.x > this.old_x + 40 + this.speed * 5) {
        this.old_x = this.pos.x;
        this.frame = (this.frame + 1) % 2;
      }
    } else {
      this.pos.x -= this.speed;

      if (this.pos.x < this.old_x - 40 - this.speed * 5) {
        this.old_x = this.pos.x;
        this.frame = (this.frame + 1) % 2;
      }
    }
  }
}

class Hero {
  constructor(canvas_w, canvas_h) {
    this.img = new Image();
    this.img.src = "Images/hero.png";
    this.size = { w: 124, h: 124 };
    this.pos = { x: -this.size.w / 2, y: canvas_h - 220 };
    this.side = 0;
    this.attack = 0;
    this.attack_timer = 0;

    window.addEventListener("touchstart", (e) => {
      this.side = +(e.touches[0].clientX > window.innerWidth / 2);
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyA") this.side = 0;
      else if (e.code === "KeyD") this.side = 1;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.attack * 114 + 114 * (this.side + 1), 0, 114, 100, this.pos.x, this.pos.y, this.size.w, this.size.h);

    if (this.attack == 0) return;
    this.attack_timer += 1;
    if (this.attack_timer > 6) {
      this.attack_timer = 0;
      this.attack = 0;
    }
  }
}

class Game {
  constructor() {
    this.container = document.querySelector(".game");
    this.ctx = this.container.getContext("2d");

    this.board = document.querySelector(".board");
    this.wave_container = this.board.querySelector(".wave span");
    this.killed_goblins_container = this.board.querySelector(".killed-goblins span");
    this.back_to_menu = this.board.querySelector(".option");
    this.back_to_menu.addEventListener("click", () => {
      menu.show();
      this.container.style.display = null;
      this.board.style.display = null;
      this.reset();
    });

    this.container.width = 1920;
    this.container.height = 768;
    this.ctx.translate(this.container.width / 2, 0);

    this.game_music = new Audio("Sound/game_music.mp3");
    this.game_over_music = new Audio("Sound/game_over.mp3");

    this.background = new Image();
    this.background.src = "Images/game_background.png";

    this.hero = new Hero(this.container.width, this.container.height);
    this.goblins = [];
    this.goblins.push(new Goblin(this.container.width, this.container.height, 0, +(Math.random() > 0.5), 3));

    this.wave = 0;
    this.next_wave_timer = 0;
    this.killed_goblins = 0;
  }

  start() {
    this.container.style.display = "block";
    if (!is_sound_muted) this.game_music.play();
    this.animation = requestAnimationFrame(this.render.bind(this));
    this.board.style.display = "flex";
  }

  reset() {
    this.goblins = [];
    this.wave = 0;
    this.next_wave_timer = 0;
    this.killed_goblins = 0;
    this.game_music.currentTime = 0;
    this.game_over_music.pause();
    this.game_over_music.currentTime = 0;
    this.board.classList.remove("game-over");
    this.wave_container.innerHTML = "1";
    this.killed_goblins_container.innerHTML = "0";
  }

  render() {
    this.ctx.drawImage(this.background, -this.container.width / 2, 0, this.container.width, this.container.height);

    this.hero.draw(this.ctx);

    for (let i = 0; i < this.goblins.length; i++) {
      this.goblins[i].draw(this.ctx);

      if (Math.abs(this.goblins[i].pos.x + this.goblins[i].size.w / 2) < this.hero.size.w / 2.5) {
        if (this.hero.side != this.goblins[i].side) {
          this.goblins[i].killed = true;
          this.killed_goblins++;
          this.killed_goblins_container.innerHTML = this.killed_goblins;
          if (!is_sound_muted) this.goblins[i].death_sound.play();
          this.goblins[i].pos.x = 100000;
          this.hero.attack = this.goblins[i].side ? -1 : 1;
        } else if (Math.abs(this.goblins[i].pos.x + this.goblins[i].size.w / 2) < this.hero.size.w / 4) {
          this.animation = cancelAnimationFrame(this.animation);
          this.game_music.pause();
          if (!is_sound_muted) this.game_over_music.play();
          this.board.classList.add("game-over");

          const killed_goblins = +localStorage.getItem("killed-goblins");
          const waves_survived_record = +localStorage.getItem("waves-survived-record");
          const killed_goblins_record = +localStorage.getItem("killed-goblins-record");

          localStorage.setItem("killed-goblins", `${killed_goblins + this.killed_goblins}`);
          if (waves_survived_record < this.wave) localStorage.setItem("waves-survived-record", `${this.wave}`);
          if (killed_goblins_record < this.killed_goblins) localStorage.setItem("killed-goblins-record", `${this.killed_goblins}`);
          return;
        }
      }
    }

    if (this.goblins.length == 0 || this.goblins[this.goblins.length - 1].killed) {
      this.next_wave_timer++;

      if (this.next_wave_timer === 1) {
        this.next_wave_timer = 0;
        this.goblins = [];
        this.wave += 1;
        this.wave_container.innerHTML = this.wave;
        let speed = 3 + Math.floor(this.wave / 2);
        let quantity = this.wave + Math.floor(this.wave / 2);

        for (let i = 0; i < quantity; i++) {
          this.goblins.push(new Goblin(this.container.width, this.container.height, i, +(Math.random() > 0.5), speed));
        }
      }
    }

    this.animation = requestAnimationFrame(this.render.bind(this));
  }
}
