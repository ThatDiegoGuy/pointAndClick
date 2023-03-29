document.getElementById('mainTitle').innerText = "Point and click adventure.";

const offsetCharacter = 16;
const gameWindow = document.getElementById("gameWindow");

const sec = 1000;

//Main character
const mainCharacter = document.getElementById("mainCharacter");
const characterAudio = document.getElementById("characterAudio");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

//Counter character
const counterSpeech = document.getElementById("counterSpeech");
const counterAudio = document.getElementById("counterAudio");
const counterPortrait = document.getElementById("counterCharacter");

//Inventory
const inventory = [];
const inventoryList = document.getElementById("inventoryList");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    console.log(e.target.id);

    switch (e.target.id){
        case "character1":
            if (checkItem("drugs")){
                showMessage(mainCharacterSpeech, characterAudio, "I have the drugs. Where is my money?");
            }else {
                showMessage(mainCharacterSpeech, characterAudio, "I think they want something... <br>What about that lady there? Maybe they know.")
            }
            break;
        case "character2":
            showMessage(mainCharacterSpeech, characterAudio, "Greeting, ma'am!<br>What do you have for me?")
            break;
            default:
            hideMessage(mainCharacterSpeech, characterAudio);
            hideMessage(counterSpeech, counterAudio);
            break; 
    }
}

function showMessage(targetBalloon, targetSound, message){
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innnerHTML = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
    targetBalloon.innerHTML = "...";
}

function getItem(item) {
    if (!checkItem(item)) {
        inventory.push(item);
        showItem(item);
    }

}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(toDoValue) {
    //Make a list item from scratch and store it in a variable
    let listItem = document.createElement("li");

    //fill that list item with value of inputfield
    listItem.appendChild(document.createTextNode(toDoValue));

    //find UL with id todoContainer and attach the list item to it.
    inventoryList.appendChild(listItem);
}