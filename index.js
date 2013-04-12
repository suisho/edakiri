// create server
var http = require('http')
var connect = require('connect');
connect.gitJson = require("connect-git-json")
var repository = "./fixture" // TODO: setting
var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('./view'))
  .use(connect.gitJson({
    gitRepo : repository
  }))

// add show only merged branches
app.use('/merged',function getMerged(req, res) {
  var exec = require('child_process').exec;
  bash = "git branch --merged "
  exec(bash,{
    cwd : repository
  }, function(err, r){
    var branches = r.split("\n")
    var current = null;
    var merged = [];
    branches.forEach(function(branch){
      var currentMarkCheck = branch.match(/\*\s(.*)/)
      if(!currentMarkCheck){
        merged.push(branch)
        return;
      }
      current = currentMarkCheck[1]
    })
    var result = {
      current : current,
      merged : merged
    }
    var json = JSON.stringify(result)
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.write(json);
    res.end()
  });
  
})

server = http.createServer(app)
server.listen(8797)
