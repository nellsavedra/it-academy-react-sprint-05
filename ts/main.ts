interface Joke {
	joke: string;
}

const jokesHistory: Joke[] = [];

async function getJoke(): Promise<Joke> {
	const response = await fetch("https://icanhazdadjoke.com", {
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
}

const printJoke = async (): Promise<void> => {
	const data: Joke = await getJoke(),
		domElement = <HTMLElement>document.querySelector("#joke");

	domElement.innerHTML = data.joke;

	console.log(data);
};
