var hbs = require('hbs');

hbs.registerHelper('isEquals', function (a, b) {
	return (a === b);
});

exports.module = hbs;