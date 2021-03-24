# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Ethan Wadsworth**

Time spent: **11** hours spent in total

Link to project: <https://glitch.com/edit/#!/fork-blossom-college>

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Added difficulty selection dropdown that changes the amount of time players get to make a guess

## Video Walkthrough

Here's a walkthrough of implemented user stories:

**Minimum Requirements:**

Features of the game including starting and stopping, losing, and clicking on each of the buttons:
![](https://i.imgur.com/hCbPArO.gif)

Gif of winning the game:<br>
![](https://i.imgur.com/xD6jsmK.gif)


**Optional Features:**

More buttons added, each button has an image, players are allowed 3 mistakes, and players can also choose a difficulty level that changes the time they get per guess:<br>
![](https://i.imgur.com/HwhvmW1.gif)


Last clue sequence shown, with sped up and random sequence. If the timer runs out, the game does not end, but counts as a single mistake instead:<br>
![](https://i.imgur.com/rThgsY8.gif)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
- [Generating random numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [Arrays and array methods]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
- [Cow image](https://unsplash.com/photos/FquDp5N1Gw0)
- [Kitten image](https://unsplash.com/photos/nKC772R_qog)
- [Dog image](https://unsplash.com/photos/-Go4DH2pZbc)
- [Hamster image](https://unsplash.com/photos/cMp84C0fPSg)
- [Rabbit image](https://unsplash.com/photos/--SDX4KWIbA)
- [Chicken image](https://unsplash.com/photos/qYiAxsaflCQ)
- [Markdown syntax](https://www.markdownguide.org/basic-syntax/)
- [Creating the Gifs](https://ezgif.com/)

2) What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   <br><br>Figuring out how to get the timer to work for each individual guess was very challenging for me personally. Getting the HTML and 
   Javascript linked to actually change the number displayed on the timer every second was relatively straightforward, but when and where 
   to start the countdown took me a while to figure out. I wanted to start the countdown after the clue sequence before the start of each 
   turn finished playing, but for some reason the countdown on the timer would immediately start when the clue sequence started playing. 
   I was putting the code to start the timer at the very end of the playClueSequence function, but it would still start running the second 
   the clue sequence started playing.<br><br>
   After using console.log and checking the runtime order of my timer setup function and when the function to start the timer was actually 
   called, I realized that the reason that my code was not working correctly had to do with how Javascript handles functions like setTimeout 
   that run after a certain amount of time. Even though I was using the setInterval function after the clue sequence was supposed to be 
   finished playing sequentially, Javascript does not wait for those time delays to occur before continuing to run the code underneath. I 
   fixed this by using my own setTimeout call that would use timing variables such as clueHoldTime and cluePauseTime to calculate the total 
   time to wait before calling the timer setup function to start the countdown on the timer. By doing this, I was able to manipulate the 
   timing so no matter how long the current clue sequence was, the delay was long enough so that the timer would be initialized using 
   setInterval immediately after the clue sequence finished playing.

3) What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   <br><br>After fixing my issues with creating the timer mentioned in the previous question, I definitely want to learn more and have 
   questions about how Javascript handles the call stack when working with an application that handles a lot of code that needs to run 
   asynchronously. While it is nice if I know the amount of time these asynchronous operations take in cases such as setTimeout, I am 
   interested in learning more about what I should do if I am dealing with operations that take an unknown amount of time to complete. 
   For example, if I am interacting with an API or pulling data from a server to render on my website, I probably will not actually know 
   how long each of these individual requests and responses take to complete. What is the proper way of handling the programming issues 
   that arise in Javascript in cases like these? How can we know when an asynchronous operation finishes running and it is appropriate to 
   render the information we received onto the webpage? As someone who has more of a background in object-oriented languages, I find these 
   questions extremely interesting.

4) If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   <br><br>One minor visual problem that I was unable to completely figure out was correctly placing the images on the buttons when they 
   are clicked. While I was successful in showing the images on the buttons when the buttons are clicked, the images look a little distorted 
   because I could not figure out how to get the images to show up with proper proportions and also have them take up the entire available 
   space on each button. I was able to fix the distortion problem by using auto and one hundred percent for either the width or height in the 
   CSS, but when I did this, the button would move down when it was clicked on to show the image. I’m sure this has something to do with how 
   the display settings on the image were set, but I was unable to figure it out. I decided to keep the minor distortions in the images because 
   it was less visually jarring than seeing a button physically move on the page when it was clicked. I would also spend some time learning 
   about CSS wildcards, as I found some of the rules to be somewhat repetitive. <br><br>
   One additional feature I would add to make the game more interesting and exciting is to scramble the colors or images on each one of the 
   buttons every time the game was played to make the game have even more of a random factor to it. To try and implement this, I would first 
   probably try to create an array of colors and an array for the image paths and create a javascript function that would be responsible for 
   adding the CSS for the button colors and use the inner HTML property to put the image tags inside of the buttons randomly.

## License

    Copyright Ethan Wadsworth

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
