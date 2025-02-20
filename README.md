<h1 align="center">GoblinSlayer - Readme</h1>
<p align="center">
  <strong>
    Arcade game where player have to survive increasing waves of goblins in one attempt
  </strong>
</p>
<div align="center">
  <img src="_for_readme/banner.png?">
</div>

<br>

<details>
  <summary>❓Why does sound start playing after the first click and not when I open the page?❓</summary>
  This happens because autoplaying sounds are blocked by the browser until the user interacts with the document.
</details>


# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Technologies](#technologies)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details :scroll:](#details-scroll)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

# Overview :sparkles:

## About
Arcade game where player have to survive increasing waves of goblins in one attempt. 

Check out the [live version](https://pasek108.github.io/GoblinSlayer/) of this project.

<br>

![preview](/_for_readme/preview.png)

## Technologies
Languages:
- HTML
- CSS
- JS
  
Libraries:
- [SCSS](https://sass-lang.com)
- [FontAwesome](https://fontawesome.com) 6.2.1
- [GoogleFonts](https://fonts.google.com)
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io)
- [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/)
- [ShareX](https://getsharex.com)
- [GIMP](https://www.gimp.org)

## Features
- Nice and consistent UI  
- Animated menu background  
- Achievements with three levels of completion  
- Well-designed credits view  
- Increasingly larger and faster waves of goblins  
- Tracking and saving survived waves, defeated goblins, and time spent in the game  
- Game over screen and the ability to restart without reloading the page  
- Mute/unmute sound option  

<br>

> [!NOTE]  
> Room for improvements:
> - Choosing the hero appearance for achievements
> - Fixing fps problem (game gets faster or slower depending on device framerate)

## Setup
Ways to run this program: 
1. Use the [live demo](https://pasek108.github.io/GoblinSlayer/)
2. Download this repo and run index.html file
3. Download this repo and start live server ([VSCode LiveServer Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), Prepros preview etc.) 

To edit this program:
- Download this repo
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Start coding

## Acknowledgements
### Images
- [Menu background](https://i.imgur.com/LAFEmei.png)
- [Achievement ribbon](https://svgsilh.com/image/1093181.html)
- [Achievement star](https://svgsilh.com/image/775819.html)
- [Game background](https://lil-cthulhu.itch.io/pixel-art-cave-background)
- [Game background floor](https://lil-cthulhu.itch.io/pixel-art-tileset-cave)
- [Hero sprite](https://www.spriters-resource.com/ds_dsi/rondoofswords/sheet/42664/)
- [Goblin sprite](https://www.spriters-resource.com/psp/lunarsilverstarharmony/sheet/58114/)

### Music and sounds
- [Menu music](https://opengameart.org/content/fantasy-music-the-wraiths-of-winter)
- [Menu option select](https://opengameart.org/content/menu-selection-click)
- [Game music 1](https://opengameart.org/content/massacre-soundtrack)
- [Game music 2](https://opengameart.org/content/fight-theme-metal)
- [Game music 3](https://filmmusic.io/song/4814-metalicious)
- [Game over music](https://freesound.org/people/HerbertBoland/sounds/128554/)
- [Goblin death](https://freesound.org/people/Rickplayer/sounds/398007/)

<br>


# Details :scroll:

## User interface
### Main menu
![main menu](/_for_readme/UI/menu.png)
Main menu has:
- Animated snow background
- Mute/unmute sound button
- Three options too choose:
  - Start option will hide the menu and runs the game
  - Achievements option will show the achievements view
  - Credits option will show the credits view

----------------------------------

### Achievements
![achievements](/_for_readme/UI/achievements.png)
Achievements view shows achievements, each of which has:
- Title ribbon
- Three stars that indicate completion of a given level
- Target text with current value of achievement and required value for next level (if it's not already max level)
- Progress bar

Achievements has 3 levels to complete and 4 possible stages:
- Stage 0:
  - Gray border
  - Disabled all stars
  - Progess bar empty or bronze color (going to bronze level)
- Stage 1:
  - Bronze border
  - Bronze star lighted up
  - Silver progess bar color (going to silver level)
- Stage 2:
  - Silver border
  - Silver and bronze stars lighted up
  - Gold progess bar color (going to gold level)
- Stage 3:
  - Gold border
  - All stars lighted up
  - Gold progess bar color (gold level is max and it is completed)

----------------------------------

### Credits
![credits](/_for_readme/UI/credits.png)
Credits page contains 2 sections with links for resources used in the project and link to my github

----------------------------------

### Game
![in game](/_for_readme/UI/game.png)
At the top of the game view are wave and killed goblins counters and at the bottom is an instruction on what keys are used to play the game.

The way the game works is simple:
- Player is standing in the middle
- Game generates random waves of goblins which runs towards the player
- Player has to use keys A and D to face left or right direction
- If player is facing goblin direction, he will kill the goblin, otherwise player will lose
- When player clears a wave, new one is generated with more goblins that are faster

----------------------------------

### Game over
![game over](/_for_readme/UI/game_over.png)
Game over view displays survived waves, killed goblins and button that goes back to main menu


## Project structure
- :file_folder: GoblinSlayer (project folder)
  - :page_facing_up: *github and prepros config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Images - :page_facing_up: *images used in the project*
  - :file_folder: Sound - :page_facing_up: *sounds and music used in project*
  - :file_folder: Scripts - :page_facing_up: *scripts used in project*
  - :file_folder: Styles
    - :page_facing_up: *css files compiled from scss by prepros*
    - :file_folder: scss - :page_facing_up: *sccs files*


## Code organization

![program diagram](/_for_readme/program-diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- SnowyBackground
- Game
- Achievements
- Credits

Game class creates and manages:
- One instance of Hero class
- Many instances of Goblin class
