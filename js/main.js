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
const jokeElement = document.querySelector("#joke");
jokeElement.addEventListener("change", function () {
    console.log("Changed");
});
const jokesHistory = [];
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
    const data = yield getJoke(), domElement = document.querySelector("#joke");
    domElement.innerHTML = data.joke;
    // console.log(data);
});
