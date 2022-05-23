interface Weather {
	weather: [
		{
			description: string;
		}
	];
	main: {
		temp: number;
	};
}

interface Emoji {
	hot: string;
	normal: string;
	cold: string;
}

// reportJokes
const jokesHistory: Joke[] = [];

let fetchedJoke: Joke | any = {};

const main = (): void => {
	getWeather();

	const scoreButtons: NodeList = document.querySelectorAll(".score-button");
	scoreButtons.forEach(element => {
		element.addEventListener("click", async function (event) {
			const target: any = event.target as Element;
			const score: number = parseInt(target.getAttribute("data-score"));
			saveToHistory(score);
			printJoke(await getJoke());
			changeBackground();
		});
	});

	const startButton = <HTMLElement>document.querySelector(".start-button");
	startButton.addEventListener("click", async function () {
		printJoke(await getJoke());
		changeScene();
	});
	
	const blobContainer = <HTMLElement>document.querySelector(".blob-container");
	const mainContainerHeight: number = document.querySelector(".main-container")!.getBoundingClientRect().height;
	blobContainer.style.height = (`${mainContainerHeight * 2}px`);
};
main();

async function getWeather(): Promise<void> {
	const tempEmoji: Emoji = {
		hot: "🔥",
		normal: "⛅",
		cold: "🥶",
	};
	const emojiDOM = <HTMLElement>document.querySelector(".emoji-weather"),
		response: Weather = await fetch("https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=" + API_KEY + "&units=metric").then(function (response): Promise<Weather> {
			return response.json();
		});

	const weatherDOM = <HTMLElement>document.querySelector(".weather-now"),
		tempDOM = <HTMLElement>document.querySelector(".temperature-now");
	weatherDOM.innerHTML = response.weather[0].description;
	tempDOM.innerHTML = response.main.temp.toString();

	if (response.main.temp > 25) {
		emojiDOM.innerHTML = tempEmoji.hot;
	} else if (response.main.temp <= 25) {
		emojiDOM.innerHTML = tempEmoji.normal;
	} else if (response.main.temp <= 15) {
		emojiDOM.innerHTML = tempEmoji.cold;
	}
}

async function getJoke(): Promise<Joke> {
	const source: string[] = ["https://icanhazdadjoke.com", "https://api.chucknorris.io/jokes/random"];
	const randomSource: number = Math.floor(Math.random() * source.length);
	const response: Joke = await fetch(source[randomSource], {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"User-Agent": "IT Academy Student (https://github.com/nellsavedra/it-academy-react-sprint-05)",
		},
	}).then(function (response): Promise<Joke> {
		return response.json();
	});
	return response;
}

async function printJoke(joke: Joke): Promise<void> {
	const data: Joke = joke,
		jokeElement = <HTMLElement>document.querySelector("#joke");

	fetchedJoke = new Joke(data.joke ?? data.value);

	jokeElement.innerHTML = fetchedJoke.joke;
}

function saveToHistory(score: number): void {
	const currentDate: Date = new Date();
	fetchedJoke.score = score;
	fetchedJoke.date = currentDate.toISOString();
	jokesHistory.push(fetchedJoke);
	console.log(jokesHistory);
}

function changeScene(): void {
	const jokeTitle = <HTMLElement>document.querySelector(".joke-title"),
		blobElement = <HTMLElement>document.querySelector(".blob-container"),
		jokeButton = <HTMLElement>document.querySelector(".print-joke"),
		scores = <HTMLElement>document.querySelector(".scores-container");

	jokeTitle.innerHTML = "Good, Meh or Nah?";
	blobElement.style.transform = "translateY(-50%) scale(10)";
	jokeButton.classList.add("display-none");
	scores.classList.remove("display-none");
}

function changeBackground(): void {
	const backgroundDOM = <HTMLElement>document.querySelector(".background-expanded");
	const colors: string[] = ["#fefae0", "#ffcdb2", "#edede9", "#fae1dd", "#fdfcdc", "#ffb3c1", "#dde5b6", "#eaf4f4", "#dfe7fd", "#f3d5b5", "#b8f2e6", "#cacfd6", "#95d5b2", "#b8f2e6", "#daffef"];
	const randomColor: number = Math.floor(Math.random() * colors.length);
	backgroundDOM.style.fill = colors[randomColor];
}
