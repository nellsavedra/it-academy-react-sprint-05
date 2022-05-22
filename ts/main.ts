// reportJokes
const jokesHistory: Joke[] = [];

let fetchedJoke: Joke | any = {};

async function getJoke(): Promise<Joke> {
	const response: Joke = await fetch("https://icanhazdadjoke.com", {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"User-Agent": "IT Academy Student (https://github.com/nellsavedra/it-academy-react-sprint-05)",
		},
	}).then(function (response): Promise<Joke>{
		return response.json();
	});

	// console.log(response);

	return response;
}

const printJoke = async (): Promise<void> => {
	const data: Joke = await getJoke(),
		jokeElement = <HTMLElement>document.querySelector("#joke"),
		jokeButton = <HTMLElement>document.querySelector(".print-joke"),
		jokeTitle = <HTMLElement>document.querySelector(".joke-title"),
		blobElement = <HTMLElement>document.querySelector(".blob-container"),
		scores = <HTMLElement>document.querySelector(".scores-container");

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
};

const saveToHistory = (score: number): void => {
	const currentDate: Date = new Date();
	
	fetchedJoke.score = score;
	fetchedJoke.date = currentDate.toISOString();
	jokesHistory.push(fetchedJoke);

	printJoke();

	console.log(jokesHistory);
};
