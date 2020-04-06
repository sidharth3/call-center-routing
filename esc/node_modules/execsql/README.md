execsql
=======

An npm project. Node.js
Execute you *.sql file which contains multiple sql statements. Usate: init database.

## Usage

### As a CLI tool

1. Make sure that you have `execsql` installed globally
	```sh
	npm install -g execsql
	```

2. Configure your db access for the first time
	```sh
	execsql -c "localhost" "root" "root"
	```

- Execute a bunch of sql statements
	```sh
	execsql "use db_cam; delete from admin;"
	```

- Execute a `.sql` file
	```sh
	execsql -f ./db.sql
	```

### As a Node dependency

1. Make sure that you have `execsql` installed locally
	```sh
	npm install execsql
	```

2. Require and use
	```js
	var execsql = require('execsql'),
		dbConfig = {
			host: 'localhost',
			user: 'root',
			password: 'root'
		},
		sql = 'use db_cam;',
		sqlFile = __dirname + '/db.sql';
	execsql.config(dbConfig)
		.exec(sql)
		.execFile(sqlFile, function(err, results){
			console.log(results);
		}).end();
	```
