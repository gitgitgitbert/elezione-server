var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = (function(){
    var app = express();


    //Cors configuration
    var originWhitelist = ['http://localhost:3000'];
    var corsOptions = {
        origin: function(origin, callback){
            var isWhitelisted = originWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials:false
    };
    app.use(cors(corsOptions));

    //TODO: continue in configuration
    //app.configure(function(){app.use(app.router)});
    
    // create application/json parser 
    var jsonParser = bodyParser.json()
    
    var elezione; 

    // create application/x-www-form-urlencoded parser 
    //var urlencodedParser = bodyParser.urlencoded({ extended: false })

    var initServer = function()
    {
        /* FOLDERS */
        app.get('/folders', getFolders);
        app.get('/folders/:id', getSpecificFolder);
        app.post('/folders', jsonParser, elezione.addFolder);

        /* IMAGESETS */
        app.get('/imageset/:id', elezione.getSpecificImageSet);
        app.post('imagesets', jsonParser, elezione.addImageSet);
        app.get('*', function(req,res){ res.sendStatus(404);})
    }

    function getFolders(req,res){
        var data = elezione.getFolders();
        if(!data){
            res.sendStatus(404);
        }else{
            res.end(JSON.stringify(data));
        }    
    }

    function getSpecificFolder(req, res){
        var data = elezione.getSpecificFolder(req.params.id);
        if(!!data){
            res.end(JSON.stringify(data));
        }else{
            res.sendStatus(404);
        }
    }


    /** Start my restful server */
    var startServer = function(data){
        elezione = data;
        initServer();
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
