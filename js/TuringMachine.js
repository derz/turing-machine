const Tape = require('./Tape');
const State = require('./State');
const Rule = require('./Rule');

module.exports = class TuringMachine {
	constructor() {
		this.states = {};
		this.tapes = [];

		this.stepsCount = 0;

		for (var i = 0; i < arguments.length; i++) {
			this.tapes.push(new Tape(arguments[i]));
		}

		this.initializeConfiguration();
	}

	run(log, complete) {
		if (log) {
			this.stepTrough(complete);
		} else {
			this.runTrough(complete);
		}
	}

	runTrough(complete) {
		while (this.step()) {
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

		// var longest = this.tapes.reduce(function (a, b) { return a.getTape().length > b.getTape().length ? a : b; });
		// console.log('longest: ' + longest.getTape().length);

		console.log('Current State: ' + this.currentState);
		console.log('Steps past: ' + this.stepsCount);

		console.log('\n');

		for (var i = 0; i < this.tapes.length; i++) {
			this.tapes[i].printTape();
		}
	}

	initializeConfiguration() {
		const q0 = new State('q0', false);
		q0.getRules().push(new Rule('0__,_0_,RRS,q0'));
		q0.getRules().push(new Rule('1__,___,RSS,q1'));
		this.states['q0'] = q0;

		const q1 = new State('q1', false);
		q1.getRules().push(new Rule('0__,0__,SLS,q2'));
		q1.getRules().push(new Rule('___,___,SSS,q4'));
		this.states['q1'] = q1;

		const q2 = new State('q2', false);
		q2.getRules().push(new Rule('00_,00_,SLS,q2'));
		q2.getRules().push(new Rule('0__,0__,SRS,q3'));
		this.states['q2'] = q2;

		const q3 = new State('q3', false);
		q3.getRules().push(new Rule('00_,000,SRR,q3'));
		q3.getRules().push(new Rule('0__,___,RSS,q1'));
		this.states['q3'] = q3;

		const q4 = new State('q4', true);
		this.states['q4'] = q4;

		this.currentState = q0;
	}

	getCurrentState() {
		return this.currentState;
	}

	getTapes() {
		return this.tapes;
	}
}

