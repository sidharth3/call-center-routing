// var mongoose = require('mongoose');
//  var dbUrl = "mongodb+srv://dbSidharth:dbSidharth@cluster0-rhq0q.mongodb.net/test?retryWrites=true&w=majority"
// mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
//   console.log('mongodb connected', err);
// })
// var db = mongoose.connection;
// //db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("Connection to database successful");
//     // define Schema
//     var agentSchema = mongoose.Schema({
//       id: Number,
//       available: Boolean,
//       service: Number,
//       online: Boolean,
//       department: String
//     });
//     var agent = mongoose.model('agent', agentSchema, 'agentCollection');
//     var agent1 = new agent({  id: 10, available: true, service:0, online: true, department: 'Phone' });
//     agent1.save(function (err, agent) {
//       if (err) return console.error(err);
//       console.log(agent.id + " saved to agent collection.");
//     });
// });
const mysql = require("mysql");
const utils = require("./utils");

const connectionPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});

let databaseName = "sampleDB";

const setDatabase = dbName => {
    if (!utils.isAlphaNum(dbName))
        throw new Error("database name must be alphanumeric");
    databaseName = dbName;
};

function getAgent(department) {
    if (typeof department !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SELECT id FROM ${databaseName}.agents WHERE available = 1 AND department = ? ORDER BY customersServed`;
    let inserts = [department];
    sql = mysql.format(sql, inserts);
    return new Promise(function(resolve, reject) {
        connectionPool.query(sql, function(err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

const getAgentDepartment = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SELECT department FROM ${databaseName}.agents WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

function getDepartment(socketID) {
    if (typeof socketID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SELECT department FROM ${databaseName}.agents WHERE customerSocket = ?`;
    let inserts = [socketID];
    sql = mysql.format(sql, inserts);
    return new Promise(function(resolve, reject) {
        connectionPool.query(sql, function(err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

const incrementCustomersServed = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET customersServed = customersServed + 1 WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const addSocketAgent = (agentID, socketID) => {
    if (typeof agentID !== "string" || typeof socketID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET customerSocket = ? WHERE id = ?`;
    let inserts = [socketID, agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const removeSocketAgent = socketID => {
    if (typeof socketID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SET SQL_SAFE_UPDATES = 0;UPDATE ${databaseName}.agents SET available = 1, customerSocket = NULL WHERE customerSocket = ?;SET SQL_SAFE_UPDATES = 1`;
    let inserts = [socketID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const setAgentAvailable = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET available = 1 WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const setAgentUnavailable = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET available = 0 WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const setAgentOnline = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET online = 1 WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const setAgentOffline = agentID => {
    if (typeof agentID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `UPDATE ${databaseName}.agents SET online = 0 WHERE id = ?`;
    let inserts = [agentID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const addWaitList = (department, socketID) => {
    if (typeof department !== "string" || typeof socketID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    if (!utils.isAlphaNum(department))
        return new Promise((resolve, reject) => {
            reject(new Error("department must be alphanumeric"));
        });
    let sql = `INSERT INTO ${databaseName}.waitlist_${department}(socket_id) VALUES(?)`;
    let inserts = [socketID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const getFromWaitList = department => {
    if (!utils.isAlphaNum(department))
        return new Promise((resolve, reject) => {
            reject(new Error("department must be alphanumeric"));
        });
    let sql = `SELECT socket_id FROM ${databaseName}.waitlist_${department} ORDER BY id asc LIMIT 1`;
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, nextInList) => {
            if (err) reject(err);
            resolve(nextInList);
        });
    });
};

const removeFromWaitList = department => {
    if (!utils.isAlphaNum(department))
        return new Promise((resolve, reject) => {
            reject(new Error("department must be alphanumeric"));
        });
    let sql = `DELETE FROM ${databaseName}.waitlist_${department} ORDER BY id asc LIMIT 1`;
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, dump) => {
            if (err) reject(err);
            resolve(dump);
        });
    });
};

const removeFromAllWaitlistsById = socketID => {
    if (typeof socketID !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SET SQL_SAFE_UPDATES = 0;DELETE FROM ${databaseName}.waitlist_sales WHERE socket_id = ?;DELETE FROM ${databaseName}.waitlist_finance WHERE socket_id = ?;DELETE FROM ${databaseName}.waitlist_general WHERE socket_id = ?;SET SQL_SAFE_UPDATES = 1`;
    let inserts = [socketID, socketID, socketID];
    sql = mysql.format(sql, inserts);
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, dump) => {
            if (err) reject(err);
            resolve(dump);
        });
    });
};

const checkDepartmentOnline = department => {
    if (typeof department !== "string")
        return new Promise((resolve, reject) => {
            reject(new Error("parameters must be of type string"));
        });
    let sql = `SELECT id FROM ${databaseName}.agents WHERE online = 1 AND department = ? ORDER BY customersServed`;
    let inserts = [department];
    sql = mysql.format(sql, inserts);
    return new Promise(function(resolve, reject) {
        connectionPool.query(sql, function(err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const clearDepartmentWaitlist = department => {
    if (!utils.isAlphaNum(department))
        return new Promise((resolve, reject) => {
            reject(new Error("department must be alphanumeric"));
        });
    let sql = `SET SQL_SAFE_UPDATES = 0;DELETE FROM ${databaseName}.waitlist_${department};SET SQL_SAFE_UPDATES = 1`;
    return new Promise(function(resolve, reject) {
        connectionPool.query(sql, function(err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getDepartmentWaitlist = department => {
    if (!utils.isAlphaNum(department))
        return new Promise((resolve, reject) => {
            reject(new Error("department must be alphanumeric"));
        });
    let sql = `SELECT * FROM ${databaseName}.waitlist_${department}`;
    return new Promise(function(resolve, reject) {
        connectionPool.query(sql, function(err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = {
    getAgent,
    incrementCustomersServed,
    addSocketAgent,
    removeSocketAgent,
    setAgentAvailable,
    setAgentUnavailable,
    addWaitList,
    getDepartment,
    getFromWaitList,
    removeFromWaitList,
    setAgentOnline,
    setAgentOffline,
    removeFromAllWaitlistsById,
    getAgentDepartment,
    checkDepartmentOnline,
    clearDepartmentWaitlist,
    getDepartmentWaitlist,
    connectionPool,
    setDatabase
};
