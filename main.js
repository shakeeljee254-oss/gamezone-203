/* GameZone 203 settings and game catalogue.
   Add a new game by copying one object in the GZ_GAMES list.
   Use a real game URL in "url". For your own game use its GitHub Pages path. */
window.GZ_CONFIG = {
  siteName: "GameZone 203",
  games: [
    { id:"neon-snake", name:"Neon Snake", category:"Arcade", emoji:"🐍", tag:"YOUR GAME", description:"Guide the snake, collect points and beat your best score.", url:"games/neon-snake/NEON-SNAKE.html", popular:true, kids:true, bg:"#e5f8f2" },
    { id:"2048", name:"2048", category:"Puzzle", emoji:"🔢", tag:"BRAIN GAME", description:"Join the numbers and reach the 2048 tile.", url:"https://play2048.co/", popular:true, kids:true, bg:"#fff1dc" },
    { id:"tetris", name:"Tetris", category:"Classic", emoji:"🧩", tag:"CLASSIC", description:"Fit the falling blocks and clear the lines.", url:"https://tetris.com/play-tetris", popular:true, kids:true, bg:"#e9eaff" },
    { id:"chess", name:"Chess", category:"Puzzle", emoji:"♟️", tag:"THINKING", description:"Play a classic strategy game and practise your moves.", url:"https://www.chess.com/play", popular:true, kids:true, bg:"#edf3e8" },
    { id:"google-doodle", name:"Google Doodle Games", category:"Kids", emoji:"🎨", tag:"FAMILY FUN", description:"Explore playful mini-games and interactive doodles.", url:"https://www.google.com/doodles", popular:true, kids:true, bg:"#fff0f3" },
    { id:"coolmath", name:"Coolmath Games", category:"Kids", emoji:"🧠", tag:"KIDS PICK", description:"Find puzzles, logic games and fun challenges.", url:"https://www.coolmathgames.com/", popular:false, kids:true, bg:"#e7f6ff" },
    { id:"poki", name:"Poki Games", category:"Arcade", emoji:"🕹️", tag:"GAME COLLECTION", description:"Discover a large collection of free online games.", url:"https://poki.com/", popular:true, kids:true, bg:"#f1eaff" },
    { id:"crazygames", name:"CrazyGames", category:"Arcade", emoji:"🎯", tag:"MORE GAMES", description:"Browse a wide range of free browser games.", url:"https://www.crazygames.com/", popular:true, kids:false, bg:"#fff3df" }
  ]
};