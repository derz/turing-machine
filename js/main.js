const TuringMachine = require('./TuringMachine');

(function(calc) {
	calc = calc.split('*');
	num = new Array(parseInt(calc[0], 10)).fill('0').join('') + '1' + new Array(parseInt(calc[1], 10)).fill('0').join('');

	const t = new TuringMachine(num, '', '');

	t.run(true, function() {
		const tapes = t.getTapes();

		console.log(
			'\n\nResult: ' +
			tapes[tapes.length - 1].getTape().join('').match(/0/g).length +
			'\n\n'
		);
	});

}('3*2'));