var express = require("express");
var _ = require("lodash");

module.exports = (function(){
    var app = express();
    var cachedData;

    /* FOLDERS */
    /** List */
    app.get('/folders', function (req, res) {
        if(cachedData && cachedData.folders){
            res.end(JSON.stringify(cachedData.folders));    
        }
        else{
            res.sendStatus(404);
        }
    });

    /** Get */
    app.get('/folders/:id', function(req, res){
        if(cachedData && cachedData.folders){
            var requested = _.find(cachedData.folders,"id",req.params.id);
            if(requested)
            {
                res.end(JSON.stringify(requested));
            }
            else{
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(404);
        }
    })

    /** Add */
    app.post('/folders', function (req, res) {
        // First read existing users.
        // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     data = JSON.parse( data );
        //     data["user4"] = user["user4"];
        //     console.log( data );
        //     res.end( JSON.stringify(data));
        // });
        console.log("Added: ");
    })


    app.get('/:id', function (req, res) {
        // First read existing users.
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        users = JSON.parse( data );
        var user = users["user" + req.params.id]
        console.log( user );
        res.end( JSON.stringify(user));
        });
    })

    app.post('/addUser', function (req, res) {
        // First read existing users.
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            data["user4"] = user["user4"];
            console.log( data );
            res.end( JSON.stringify(data));
        });
    })

    /** Start my restful server */
    var startServer = function(data){
        cachedData = data;
        var server = app.listen(8081, function () {
            var host = server.address().address
            var port = server.address().port
            console.log("Example app listening at http://%s:%s", host, port)
        })
    };



    return {
        startServer: startServer
    }
})();
