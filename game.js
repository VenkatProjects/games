let health = 20;
let player = "";

const story = document.getElementById("story");
const buttons = document.getElementById("buttons");
const healthBox = document.getElementById("health");

function updateHealth(){
  healthBox.innerText = "Health: " + health;
}

function startGame(){
  player = document.getElementById("name").value;
  let age = parseInt(document.getElementById("age").value);

  if(age < 18){
    story.innerText = "You are not old enough to play!";
    return;
  }

  document.getElementById("startBox").style.display = "none";
  updateHealth();

  story.innerText =
"A man is walking down the village road with a tiger, a goat and a bundle of grass. He reaches a river with a tiny boat that can carry only one item at a time. How will he take all safely?";

  showButtons(["Yes","No"], playChoice);
}

function showButtons(arr, handler){
  buttons.innerHTML="";
  arr.forEach(x=>{
    let b=document.createElement("button");
    b.innerText=x;
    b.onclick=()=>handler(x);
    buttons.appendChild(b);
  });
}

function playChoice(c){
  if(c=="No"){
    story.innerText="Bye!";
    buttons.innerHTML="";
    return;
  }

  story.innerText="Do you want to start with a clue? (Lose 5 health)";
  showButtons(["Yes","No"], clueChoice);
}

function clueChoice(c){
  if(c=="Yes"){
    health -= 5;
    updateHealth();
    story.innerText="Clue: The tiger eats the goat. The goat eats the grass. You can carry only one at a time.";
  } else {
    story.innerText="Choose carefully. What will you do first?";
  }
  showButtons(["Tiger","Goat"], firstChoice);
}

function firstChoice(c){
  if(c=="Tiger"){
    health -= 15;
    updateHealth();
    story.innerText="Oops! You went with Tiger. Goat ate the grass. You lost!";
    buttons.innerHTML="";
  } else {
    story.innerText="Great! You crossed with Goat. Do you want to bring anything back?";
    showButtons(["Yes","No"], secondChoice);
  }
}

function secondChoice(){
  story.innerText="Next which one do you want to carry?";
  showButtons(["Tiger","Bundle of Grass"], thirdChoice);
}

function thirdChoice(c){
  story.innerText="You crossed the river with Tiger.";
  showButtons(["Continue"], ()=>fourthStep());
}

function fourthStep(){
  story.innerText="Do you want a clue here? (Lose 5 health)";
  showButtons(["Yes","No"], finalClue);
}

function finalClue(c){
  if(c=="Yes"){
    health -= 5;
    updateHealth();
    story.innerText="Clue: Bring the goat back, carry the bundle of grass, then finally carry the goat.";
  } else {
    story.innerText="Make your final move.";
  }
  showButtons(["Bundle of Grass"], finalChoice);
}

function finalChoice(){
  story.innerText="🎉 You crossed with the bundle of grass and then the goat. YOU WON!";
  buttons.innerHTML="";
}
