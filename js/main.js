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
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const tempEmoji = {
            hot: "🔥",
            normal: "⛅",
            cold: "🥶",
        };
        const emojiDOM = document.querySelector(".emoji-weather");
        const response = yield fetch("https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=" + API_KEY + "&units=metric").then(function (response) {
            return response.json();
        });
        const weatherDOM = document.querySelector(".weather-now");
        const tempDOM = document.querySelector(".temperature-now");
        weatherDOM.innerHTML = response.weather[0].description;
        tempDOM.innerHTML = response.main.temp.toString();
        if (response.main.temp > 25) {
            emojiDOM.innerHTML = tempEmoji.hot;
        }
        else if (response.main.temp <= 25) {
            emojiDOM.innerHTML = tempEmoji.normal;
        }
        else if (response.main.temp <= 15) {
            emojiDOM.innerHTML = tempEmoji.cold;
        }
    });
}
getWeather();
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const source = ["https://icanhazdadjoke.com", "https://api.chucknorris.io/jokes/random"];
        const randomSource = Math.floor(Math.random() * source.length);
        const response = yield fetch(source[randomSource], {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent": "IT Academy Student (https://github.com/nellsavedra/it-academy-react-sprint-05)",
            },
        }).then(function (response) {
            return response.json();
        });
        return response;
    });
}
const printJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield getJoke(), jokeElement = document.querySelector("#joke"), jokeButton = document.querySelector(".print-joke"), jokeTitle = document.querySelector(".joke-title"), blobElement = document.querySelector(".blob-container"), scores = document.querySelector(".scores-container");
    fetchedJoke = new Joke((_a = data.joke) !== null && _a !== void 0 ? _a : data.value);
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
});
const saveToHistory = (score) => {
    const backgroundDOM = document.querySelector(".background-expanded");
    const colors = ["#fefae0", "#ffcdb2", "#edede9", "#fae1dd", "#fdfcdc", "#ffb3c1", "#dde5b6", "#eaf4f4", "#dfe7fd", "#f3d5b5", "#b8f2e6", "#cacfd6", "#95d5b2", "#b8f2e6", "#daffef"];
    const randomColor = Math.floor(Math.random() * colors.length);
    const currentDate = new Date();
    fetchedJoke.score = score;
    fetchedJoke.date = currentDate.toISOString();
    jokesHistory.push(fetchedJoke);
    backgroundDOM.style.fill = colors[randomColor];
    printJoke();
};
