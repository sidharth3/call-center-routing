var fs = require('fs'),
	_ = require('underscore'),
	mysql = require('mysql'),
	config = {
		multipleStatements: true
	},
	conn;

function exec(sql, callback) {
	conn.query(sql, function (err, results) {
		if (!_.isArray(results)) {
			results = [results];
		}
		callback(err, results);
	});
	return this;
}

function execFile(filename, callback) {
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;
		exec(data, callback);
	});
	return this;
}

exports.exec = exec;
exports.execFile = execFile;
exports.end = function () {
	conn.end();
	return this;
};
exports.config = function (options) {
	_.extend(config, _.pick(options, ['host', 'user', 'password']));
	conn = mysql.createConnection(config);
	conn.connect();
	return this;
};
