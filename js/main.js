const TuringMachine = require('./TuringMachine');

(function(num) {
	const t = new TuringMachine(num, "", "");

	t.run(true, function() {
		const tapes = t.getTapes();

		console.log(
			'\n\nResult: ' +
			tapes[tapes.length - 1].getTape().join('').match(/0/g).length +
			'\n\n'
		);
	});
}('00000100'));