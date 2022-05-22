"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// reportJokes
const jokesHistory = [];
let fetchedJoke = {};
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://icanhazdadjoke.com", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent": "IT Academy Student (https://github.com/nellsavedra/it-academy-react-sprint-05)",
            },
        }).then(function (response) {
            return response.json();
        });
        // console.log(response);
        return response;
    });
}
const printJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getJoke(), jokeElement = document.querySelector("#joke"), jokeButton = document.querySelector(".print-joke"), jokeTitle = document.querySelector(".joke-title"), blobElement = document.querySelector(".blob-container"), scores = document.querySelector(".scores-container");
    fetchedJoke = new Joke(data.joke);
    jokeTitle.innerHTML = "Good, Meh or Nah?";
    blobElement.style.transform = "translateY(-50%) scale(4)";
    jokeButton.classList.add("display-none");
    scores.classList.remove("display-none");
    jokeElement.innerHTML = fetchedJoke.joke;
    scores.innerHTML = `
	<button onclick="saveToHistory(3)">😂</button>
	<button onclick="saveToHistory(2)">😑</button>
	<button onclick="saveToHistory(1)">😓</button>
	`;
    // console.log(fetchedJoke);
});
const saveToHistory = (score) => {
    const currentDate = new Date();
    fetchedJoke.score = score;
    fetchedJoke.date = currentDate.toISOString();
    jokesHistory.push(fetchedJoke);
    printJoke();
    console.log(jokesHistory);
};
