module.exports = (function() {
	const EMPTY_CELL = "_";

	const COLOR_RESET = "\x1b[0m";
	const COLOR_BG = "\x1b[46m";

	const MIN_LENGTH = 30;

	return class Tape {
		constructor(tapeConfig) {
			this.tape = tapeConfig.split('') || [];

			const fillLenght = Math.round(Math.max(0, MIN_LENGTH - this.tape.length) * 0.5);
			this.tape = (new Array(fillLenght).fill(EMPTY_CELL)).concat(this.tape.concat(new Array(fillLenght).fill(EMPTY_CELL)));

			this.position = fillLenght;
		}

		moveRight() {
			if (this.position >= this.tape.length) {
				this.tape.push(EMPTY_CELL);
			}

			this.position += 1;
		}

		moveLeft() {
			if (this.position === 0) {
				this.tape.splice(0, 0, EMPTY_CELL);
			} else {
				this.position -= 1;
			}
		}

		setValue(value) {
			this.tape[this.position] = value;
		}

		getTape() {
			this.getCurrentValue();

			return this.tape;
		}

		getCurrentValue() {
			if (this.tape.length === this.position) {
				this.tape.push(EMPTY_CELL);
			}

			if (!this.tape[this.position]) {
				this.tape.splice(this.position, 1, EMPTY_CELL);
			}

			return this.tape[this.position];
		}

		printTape() {
			function red(s) {
				return COLOR_BG + s + COLOR_RESET;
			}

			const tape = this.tape.slice(0);

			const before = tape.splice(0, this.position);
			const current = tape.splice(0, 1);
			const after = tape;

			console.log(
				(before.join(' ') + ' ' + red(current) + ' ' + after.join(' ')).trim()
			);
		}
	}
}());
