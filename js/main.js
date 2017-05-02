const TuringMachine = require('./TuringMachine');

const t = new TuringMachine("0000100", "", "");

t.run(true, function() {
	const tapes = t.getTapes();

	console.log(
		'\n\nResult: ' +
		tapes[tapes.length - 1].getTape().join('').match(/0/g).length +
		'\n\n'
	);
});