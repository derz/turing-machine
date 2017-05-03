module.exports = class State {
	constructor(name, accepting) {
		this.name = name;
		this.accepting = accepting;
		this.rules = [];
	}

	getCorrectRule(tapes) {
		for (let i = 0, len = this.rules.length; i < len; i++) {
			const rule = this.rules[i];

			if (rule.checkSingleRuleCorrect(tapes)) {
				return rule;
			}
		}

		return false;
	}

	toString() {
		return this.name;
	}

	getRules() {
		return this.rules;
	}

	addRule(rule) {
		this.rules.push(rule);
	}

	isAccepting() {
		return this.accepting;
	}
};