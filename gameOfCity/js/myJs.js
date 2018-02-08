'use strict';
/**
*   Все  города которые можно использовать будут хранятся в массиве allCities. Я выбрал этот способ потом что не будет споров насчет город это или нет. В дальнейшем можно будет сделать загрузка городов через файл , например города России, города Белоруси или свои. 
*/
var allCities = ['Минск', 'Гомель', 'Могилев', 'Витебск', 'Гродно', 'Брест', 'Бобруйск', 'Барановичи', 'Борисов', 'Пинск', 'Орша', 'Мозырь', 'Солигорск', 'Кобрин', 'Калиновичи', 'Горки', 'Иванск', 'Тяпина', 'Антаполье', 'Жабинка', 'Заславль']
var computerCitiesList = allCities.slice();
var usedComputerCitiesList = [];
var usedPlayerCitiesList = [];
var firstletter = '';
var compVin = false;

/**
* @function that tests equality first letter of word and letter
* @param string word - the word in which the first letter is checked
* @param string letter - word checked for this letter
* @return bool - is this letter or not
*/ 
function checkFirstLetterOfTheWord(word, letter) {
    return (word.substr(0, 1).toLowerCase() == letter.toLowerCase());
}

// 
/**
* @function that returns the last letter of a word
* @param string word - source word
* @returns string - last lettr of a word
*/
function getLastLetterOfTheWord(word) {
    return word.slice(-1);
} 

/**
* @function word selection by computer
* @param string firstletter - first letter of a word
* @returns string - a word that begins on firstletter
 */
function getComputeersCityChoice(firstletter) {
    for (var i = 0; i < computerCitiesList.length; i++) {
        if (checkFirstLetterOfTheWord(computerCitiesList[i], firstletter)) {
            var bufer = computerCitiesList[i];
            computerCitiesList.splice(i, 1);
            return bufer;
        }
    }
    
}

/**
* @function check whether the city is on the list of cities
* @param string city - Verifiable city
* @returns bool - true or false
*/
function testCity(city) {
    if (allCities.indexOf(city) != -1) {
        computerCitiesList.splice(computerCitiesList.indexOf(city), 1);
        return true;
    }
    return false;
}

/**
* @function check is city  a member of used cities lists
* @param string city - name of city
* @returns bool - true or false 
*/
function isCityAlredyUsed(city) {

    if (usedComputerCitiesList.indexOf(city) == -1 && usedPlayerCitiesList.indexOf(city) == -1)
        return true;
    return false;
}

/**
 * @function that controls game
 * @returns break function 
 */
function manageGame() {
    
    var inputCity = document.getElementById('inputCity').value;

    if (testCity(inputCity)) {
        if (!isCityAlredyUsed(inputCity)) {
            document.getElementById('compSay').innerHTML = 'Этот город уже был!!!';
            document.getElementById('inputCity').value = '';
            return;
        } else {
            if (firstletter != '' && !checkFirstLetterOfTheWord(inputCity, firstletter)) {
                document.getElementById('compSay').innerHTML = 'Вы ввели город не на ту букву';
                return;
            }
            SearchCity(myMap, inputCity);
            usedPlayerCitiesList.push(inputCity);

            firstletter = getLastLetterOfTheWord(inputCity).toUpperCase();
            document.getElementById('inputCity').value = firstletter;

            var wordComp = getComputeersCityChoice(firstletter);
            if (wordComp != undefined) {
                usedComputerCitiesList.push(wordComp);
                SearchCity(myMap, wordComp);
                firstletter = getLastLetterOfTheWord(wordComp).toUpperCase();
                document.getElementById('inputCity').value = firstletter;
                document.getElementById('compSay').innerHTML = 'Компьютер: я придумал город. Это ' + wordComp + '.Тебе на букву ' + firstletter;
            } else {
                endGame();
            }
        }
    } else {
        document.getElementById('compSay').innerHTML = 'Такого города нет!!!';
        document.getElementById('inputCity').value = '';
        return;
    }

}

/**
 * @function that make end modal window
 */
function endGame() {
    if (compVin) {
        document.getElementById('win').innerHTML = 'Увы, победил компьютер.';
    } else {
        document.getElementById('win').innerHTML = 'Вы победили!';
    }
    if (!usedPlayerCitiesList.length) {
        document.getElementById('compCity').innerHTML = 'Жаль, вы сразу сдались. Зачем?(';
    } else if (!usedComputerCitiesList.length) {
        document.getElementById('compCity').innerHTML = 'Идеальный ход. Победаа с одного хода.';
    } else {
        document.getElementById('compCity').innerHTML = 'Слова использованные компьютером: ' + usedComputerCitiesList.join(', ');
        document.getElementById('playCity').innerHTML = 'Слова использованные игроком: ' + usedPlayerCitiesList.join(', ');

        document.getElementById('compTotal').innerHTML = 'Количество используемых городов компьютером: ' + usedComputerCitiesList.length;
        document.getElementById('playTotal').innerHTML = 'Количество используемых городов игроком: ' + usedPlayerCitiesList.length;
    }
    $('#endGame').modal('show');
    startGame();
}

/**
 * @function updates all data and starts a new one.
 */
function startGame() {
    computerCitiesList = allCities.slice();
    usedComputerCitiesList = [];
    usedPlayerCitiesList = [];
    firstletter = '';
    compVin = false;
    document.getElementById('compSay').innerHTML = '';
    document.getElementById('inputCity').value = '';
    myMap.geoObjects.removeAll();
    myMap.update();
}


/**
 * @function which is given
 */
function surrender() {
    compVin = true;
    endGame();
}


/**
 * @function which displays a list of cities that you can use
 */
function citiesThatYouCanUse(){
    document.getElementById('townCan').innerHTML = allCities.join(', ');
}