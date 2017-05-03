const Tape = require('./Tape');
const State = require('./State');
const Rule = require('./Rule');

module.exports = class TuringMachine {
	constructor(options) {
		this.states = {};
		this.tapes = [];

		this.stepsCount = 0;

		const tapes = options.tapes;

		for (var i = 0; i < tapes.length; i++) {
			this.tapes.push(new Tape(tapes[i]));
		}

		this.initializeConfiguration(options.states);
	}

	run(log, complete) {
		if (log) {
			this.stepTrough(complete);
		} else {
			this.runTrough(complete);
		}
	}

	runTrough(complete) {
		while (this.step(true)) {
		}

		if (complete) complete.call();
	}

	stepTrough(complete) {
		if (this.step(true)) {
			setTimeout(function() {
				this.stepTrough(complete);
			}.bind(this), 200);
		} else {
			if (complete) complete.call();
		}
	}

	step(log) {
		if (log) {
			this.printStep();
		}

		const transitionRule = this.currentState.getCorrectRule(this.tapes);

		this.stepsCount += 1;

		if (transitionRule) {
			transitionRule.moveTape(this.tapes);
			this.currentState = this.states[transitionRule.getNextstate()];

			return true;
		} else if (!transitionRule && this.currentState.isAccepting()) {
			return false; // Akzeptierender Zustand, Fertig!
		}

		return false; // Eigentlich ein Fehler
	}

	printStep() {
		console.log('\x1Bc');

		console.log('Current State: ' + this.currentState);
		console.log('Steps past: ' + this.stepsCount);

		console.log('\n');

		for (var i = 0; i < this.tapes.length; i++) {
			this.tapes[i].printTape();
		}
	}

	initializeConfiguration(states) {

		for (let i = 0, len = states.length; i < len; i++) {
			const stateData = states[i];
			const state = new State(stateData.name, stateData.accepting);
			const rules = stateData.rules || [];

			for (let j = 0; j < rules.length; j++) {
				state.addRule(new Rule(rules[j]));
			}

			this.states[stateData.name] = state;
		}

		this.currentState = this.states[Object.keys(this.states)[0]];
	}

	getCurrentState() {
		return this.currentState;
	}

	getTapes() {
		return this.tapes;
	}
}

