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
const counterAmelia = document.getElementById("counterAmelia");
const counterBob = document.getElementById("counterBob");

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

    switch (e.target.id) {
        case "character2": //Bob
            if (checkItem("drugs")) {
                showMessage(mainCharacterSpeech, characterAudio, "I have the drugs. Where is my money?");
                setTimeout(function () { counterBob.style.opacity = 1;}, 4 * sec);
                setTimeout(showMessage, 2 * sec, counterSpeech, counterAudio, "You got the drugs, he?<br>I will count it, I don't trust you." );
                setTimeout(showMessage, 4 * sec, mainCharacterSpeech, characterAudio, "Alright, sounds good.");
                hideMessage(mainCharacterSpeech, counterSpeech);
                setTimeout(showMessage, 8 * sec, counterAudio, counterSpeech, "You got a deal!<br>Don't come back here again, comrade.");
            } else {
                setTimeout(showMessage, 0.5 * sec, mainCharacterSpeech, characterAudio, "Good day, lad!");
                setTimeout(function() {counterBob.style.opacity = 1;}, 2 * sec);
                setTimeout(showMessage, 5 * sec, counterSpeech, counterAudio, "Good day, son. What are you looking for?<br>Maybe some tea?");
                setTimeout(showMessage, 9 * sec, mainCharacterSpeech, characterAudio, "I would like some of that white tea<br>if you know what I mean...");
            }
            break;
        case "character1":  //Amelia
            showMessage(mainCharacterSpeech, characterAudio, "Greeting, ma'am!<br>What do you have for me?")
            break;
        default:
            hideMessage(mainCharacterSpeech, characterAudio);
            hideMessage(counterSpeech, counterAudio);
            break;
    }
}

function showMessage(targetBalloon, targetSound, message) {
    targetSound.play();
    targetBalloon.style.opacity = 1;
    targetBalloon.innerHTML = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = 0;
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
    let listItem = document.createElement(li);

    //fill that list item with value of inputfield
    listItem.appendChild(document.createTextNode(toDoValue));

    //find UL with id todoContainer and attach the list item to it.
    inventoryList.appendChild(listItem);
}