const TuringMachine = require('./TuringMachine');

const tm = function(calc, steps) {
	calc = calc.split('*');
	num = new Array(parseInt(calc[0], 10) + 1).join('0') + '1' + new Array(parseInt(calc[1], 10) + 1).join('0');

	const t = new TuringMachine(num, '', '');

	t.run(steps, function() {
		const tapes = t.getTapes();

		console.log(
			'\n\nResult: ' +
			(tapes[tapes.length - 1].getTape().join('').match(/0/g) || []).length +
			'\n\n'
		);
	});

};

var args = process.argv.slice(2);

console.log(args[0], args[1]);