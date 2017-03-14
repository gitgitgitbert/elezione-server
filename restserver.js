var express = require("express");
var _ = require("lodash");
var bodyParser = require('body-parser')

/** TODO: 
 *  - Use Bodyparser?
 */

module.exports = (function(){
    var app = express();

    //TODO: Exact Task of this
    //app.configure(function(){app.use(app.router)});
    
    // create application/json parser 
    var jsonParser = bodyParser.json()
    
    // create application/x-www-form-urlencoded parser 
    var urlencodedParser = bodyParser.urlencoded({ extended: false })


    var cachedData;

    /* FOLDERS */
    /** List */
    app.get('/folders', function (req, res) {
        console.log("Folders requested");
        if(cachedData && cachedData.folders){
            res.end(JSON.stringify(cachedData.folders));    
        }
        else{
            res.sendStatus(404);
        }
    });

    /** Get */
    app.get('/folders/:id', function(req, res){
        console.log("Specific Folder requested");
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
    app.post('/folders',jsonParser,  function (req, res) {
        // First read existing users.
        // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     data = JSON.parse( data );
        //     data["user4"] = user["user4"];
        //     console.log( data );
        //     res.end( JSON.stringify(data));
        // });
        // TODO NEXT: Body is empty, which is said to because
        // of wrong configuration?
        try{
            console.log("Method: " +req.method);
            console.log("Url: " + req.url);
            console.log("Headers: " + JSON.stringify(req.headers));
            console.log("User Agent: " + req.headers['user-agent']);

            if(req.body && req.body.awdata){
                console.log("Added: " + req.body.awdata);
            }

            // //This is going to be simplyfied by e.g. body or Bodyparser
            // var body = [];
            // req.on('data', function(chunk) {
            //     body.push(chunk);
            // }).on('end', function() {
            //     body = Buffer.concat(body).toString();
            //     // at this point, `body` has the entire request body stored in it as a string
            //     console.log("Body " + body);

            // });

            if (!req.body) return res.sendStatus(400);
            
            console.log("Body: " + JSON.stringify(req.body));
            // create user in req.body 
        } catch(e)
        {
            console.log("Error on post");
        }

        //The newly added object should be returned
        return res.sendStatus(200);
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
