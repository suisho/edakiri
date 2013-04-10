// create server
var http = require('http')
var connect = require('connect');
connect.router = require('connect_router');
connect.gitJson = require("connect-git-json")

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('./view'))
  .use(connect.gitJson({
    gitRepo : "./fixture"
  }));
server = http.createServer(app)
server.listen(8797)
