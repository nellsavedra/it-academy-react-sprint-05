class Joke {
	_joke: string;
	_score: number | undefined;
	_date: Date | undefined;
	constructor(joke: string) {
		this._joke = joke;
	}

	get joke() {
		return this._joke;
	}

	set joke(joke) {
		this._joke = joke;
	}

	get score() {
		return this._score;
	}

	set score(score) {
		this._score = score;
	}

	get date() {
		return this._date;
	}

	set date(date) {
		this._date = date;
	}
}
