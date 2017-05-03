const TuringMachine = require('./TuringMachine');
const args = process.argv.slice(2);

const config = require('./config.json');

const t = new TuringMachine({
	tapes: config.tapes,
	states: config.states
});


t.run(true, function() {
	const tapes = t.getTapes();

	console.log(
		'\n\nResult: ' +
		(tapes[tapes.length - 1].getTape().join('').match(/0/g) || []).length +
		'\n\n'
	);
});


// (function(calc, steps) {
// 	calc = calc.split('*');
// 	num = new Array(parseInt(calc[0], 10) + 1).join('0') + '1' + new Array(parseInt(calc[1], 10) + 1).join('0');

// 	const t = new TuringMachine(num, '', '');

// 	t.run(steps, function() {
// 		const tapes = t.getTapes();

// 		console.log(
// 			'\n\nResult: ' +
// 			(tapes[tapes.length - 1].getTape().join('').match(/0/g) || []).length +
// 			'\n\n'
// 		);
// 	});

// }(args[0], args[1]));