"use strict";

if (localStorage.getItem("killed-goblins") == null) localStorage.setItem("killed-goblins", "0");
if (localStorage.getItem("time-in-game") == null) localStorage.setItem("time-in-game", "0");
if (localStorage.getItem("waves-survived-record") == null) localStorage.setItem("waves-survived-record", "0");
if (localStorage.getItem("killed-goblins-record") == null) localStorage.setItem("killed-goblins-record", "0");

let is_sound_muted = false;
