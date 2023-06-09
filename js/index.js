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
let inventory = [];
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
                setTimeout(function () { counterBob.style.opacity = 1; }, 2 * sec);
                setTimeout(showMessage, 2 * sec, counterSpeech, counterAudio, "You got the drugs, he?<br>I will count it, I don't trust you.");
                setTimeout(showMessage, 4 * sec, mainCharacterSpeech, characterAudio, "Alright, sounds good.");
                setTimeout(showMessage, 8 * sec, counterAudio, counterSpeech, "You got a deal!<br>Don't come back here again, comrade.");
                setTimeout(function () { counterBob.style.opacity = 0; }, 9 * sec);
                setTimeout(removeItem, 9 * sec, "drugs", "drugs")
                //removeItem("drugs","drugs");
            } else {
                setTimeout(showMessage, 0.5 * sec, mainCharacterSpeech, characterAudio, "Good day, lad!");
                setTimeout(function () { counterBob.style.opacity = 1; }, 2 * sec);
                setTimeout(showMessage, 5 * sec, counterSpeech, counterAudio, "Good day, son. What are you looking for?<br>Maybe some tea?");
                setTimeout(showMessage, 9 * sec, mainCharacterSpeech, characterAudio, "I would love myself some green tea, yeah.<br> *whispers* Are you also in some other types of bussiness?");
                setTimeout(showMessage, 12 * sec, counterSpeech, counterAudio, "Coming right up!<br>Go to the lady across the street, she has what you need.")
                setTimeout(function () { counterBob.style.opacity = 0; }, 16 * sec);
            }
            break;
        case "character1":  //Amelia
            if (checkItem("drugs")) {
                setTimeout(function () { counterAmelia.style.opacity = 1; }, 0.5 * sec);
                setTimeout(showMessage, 0.5 * sec, counterSpeech, counterAudio, "Hello, love! Would you like...<br>What are you doing here?");
                setTimeout(showMessage, 3 * sec, mainCharacterSpeech, characterAudio, "I want to buy more of your drugs.");
                setTimeout(showMessage, 5 * sec, counterSpeech, counterAudio, "I will get my batch next Tuesday.<br>Now, get lost!");
                setTimeout(function () { counterAmelia.style.opacity = 0; }, 6 * sec)
            } else {
                setTimeout(showMessage, 0.5 * sec, mainCharacterSpeech, characterAudio, "Greetings, ma'am!");
                setTimeout(function () { counterAmelia.style.opacity = 1; }, 3 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, counterAudio, "Hello, love! Would you like to buy something?<br>Our tea is the best in town!");
                setTimeout(showMessage, 7 * sec, mainCharacterSpeech, characterAudio, "I could use a cup of teas, as well as something else...<br>if you know what I mean");
                setTimeout(showMessage, 10 * sec, counterSpeech, counterAudio, "Come to the back, I got what you need.");
                setTimeout(getItem, 11 * sec,"drugs", "drugs");
                setTimeout(function () { counterAmelia.style.opacity = 0; }, 13 * sec);
            }
            break;
        default:
            hideMessage(mainCharacterSpeech, characterAudio);
            hideMessage(counterSpeech, counterAudio);
            break;
    }
}

function showMessage(targetBalloon, targetSound, message) {
   targetSound.currentTime = 0;
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

function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }

}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(itemName, itemId) {
    //Make a list item from scratch and store it in a variable
    let listItem = document.createElement("li");

    listItem.id = itemId;

    //fill that list item with value of inputfield
    listItem.appendChild(document.createTextNode(itemName));

    //find UL with id todoContainer and attach the list item to it.
    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newinventory) {
        return newinventory !== itemName;
    });
    document.getElementById(itemId).remove();
}