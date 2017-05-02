module.exports = class Rule {
	constructor(config) {
		this.setArgs(config.split(',')[0], config.split(',')[1], config.split(',')[2], config.split(',')[3]);
	}

	setArgs(reader, writer, movement, nextstate) {
		this.reader = reader.split('');
		this.writer = writer.split('');
		this.movement = movement.split('');
		this.nextstate = nextstate;
	}

	checkSingleRuleCorrect(tapes) {
		const allCorrect = new Array(this.reader.length);

		for (let i = 0, len = this.reader.length; i < len; i++) {
			allCorrect[i] = (tapes[i].getCurrentValue() === this.reader[i]);
		}

		return allCorrect.every(function(el) {
			return (el === true);
		});
	}

	moveTape(tapes) {
		for (let i = 0, len = this.writer.length; i < len; i++) {
			const currentTape = tapes[i];
			currentTape.setValue(this.writer[i]);

			if ("R" === this.movement[i]) {
				currentTape.moveRight();
			} else if ("L" === this.movement[i]) {
				currentTape.moveLeft();
			}
		}
	}

	getNextstate() {
		return this.nextstate;
	}
};