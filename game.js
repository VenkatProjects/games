let health = 20;
let step = 0;

const story = document.getElementById("story");
const buttons = document.getElementById("buttons");
const healthBox = document.getElementById("health");

function updateHealth(){
  healthBox.innerText = "Health: " + health;
}

function show(text, opts, handler){
  story.innerText = text;
  buttons.innerHTML="";
  opts.forEach(o=>{
    let b=document.createElement("button");
    b.innerText=o;
    b.onclick=()=>handler(o);
    buttons.appendChild(b);
  });
  updateHealth();
}

function startGame(){
  let age = parseInt(document.getElementById("age").value);
  if(age < 18){
    show("You are not old enough to play.", [], ()=>{});
    return;
  }

   document.getElementById("startBox").style.display="none";

   askPlay();

}

    
function askPlay(){
    show(
      "Do you want to play the puzzzle game?",
      ["Yes", "No"],
      gamePlay
    );
}

function gamePlay(g){
    if(g==="No"){
        gameCancel();
        return;
    }
    show(
      `you are starting with ${health} health.`,
      ["Ok"],
      showRead
    );
}
function showRead(){
    show("Read the Questions carefully!!",
        ["Continue"],
        showStory
    );
}
function showStory(){
    show(
        "Let's get start! \n\nA man is walking down the village road with a tiger, a goat and a bundle of grass. Soon he arrives at the river bank where there is one tiny boat that can carry him and one item at a time. How is he going to take all three across safely?\n\nDo you want a clue? (-5 health)",
        ["Yes","No"],
        clueStep
    );
}


function gameCancel() {
    show("Thanks for showing interest!");
}


function clueStep(c){
  if(c==="Yes"){
    health -= 5;
    show(
      "Clue: The tiger eats the goat. The goat eats the grass bundle.",
      ["Continue"],
      ()=>firstChoice()
    );
  } else firstChoice();
}

function firstChoice(){
  show("First choice: Ride along with Tiger?", ["Yes","No"], firstResult);
}

function firstResult(c){
  if(c==="Yes"){
    health -= 15;
    show("Oops! You went with tiger. Goat ate the grass. You LOST!", [], ()=>{});
  } else secondChoice();
}

function secondChoice(){
  show("Second choice: Ride along with Goat?", ["Yes"], ()=>afterGoat());
}

function afterGoat(){
  show("Great! You crossed river along with Goat.\nDo you want to bring back anything?", ["Yes"], ()=>thirdChoice());
}

function thirdChoice(){
  show("Next which one do you want to carry?", ["Tiger","Bundle of Grass"], afterThird);
}

function afterThird(){
  show("You crossed the river along with Tiger.\nDo you want to bring back goat again?", ["Yes"], ()=>finalClue());
}

function finalClue(){
  show("Do you want a clue here? (-5 health)", ["Yes","No"], finalClueResult);
}

function finalClueResult(c){
  if(c==="Yes"){
    health -= 5;
    show(
      "NOTE: Bring back the goat, carry the bundle of grass, then come back and carry the goat.",
      ["Continue"],
      finalStep
    );
  } else finalStep();
}

function finalStep(){
  show("Next which one do you want to carry?", ["Bundle of Grass"], win);
}

function win(){
  show("🎉 OKAY! You crossed with bundle of grass and finally carried the goat. YOU WON!", [], ()=>{});
}
