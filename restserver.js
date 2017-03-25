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
    
    var business; 

    // create application/x-www-form-urlencoded parser 
    //var urlencodedParser = bodyParser.urlencoded({ extended: false })

    var initServer = function()
    {
        /* FOLDERS */
        app.get('/folders', getFolders);
        app.get('/folders/:id', getSpecificFolder);
        app.post('/folders', jsonParser, addFolder);

        /* IMAGESETS */
        app.get('/imageset/:id', business.getSpecificImageSet);
        app.post('imagesets', jsonParser, business.addImageSet);
        app.all('*', function(req,res){ res.sendStatus(404);})
    }


    /** Returns the callback function for a common callback handler
     *  If no data is returned, 404 will be sent. Otherwise the given
     *  data.
     */
    function commonGetHandler(res){
        return function(data){
            if(!data){
                res.sendStatus(404);
            }else{
                res.end(JSON.stringify(data));
            }
        }
    }

    function getFolders(req,res){
        business.getFolders(commonGetHandler(res));
    }

    function getSpecificFolder(req, res){
        business.getSpecificFolder(req.params.id, commonGetHandler(res));
    }

    function addFolder(req,res){
        var callback = function(data){
            if(!data){
                //TODO: Sending 404 is wrong
                //Use more callbacks like for errors and so on
                res.sendStatus(404);
            }else{
                res.end(JSON.stringify(data));
            }   
        }

        business.addFolder(req.body, callback);
    }


    /** Start my restful server 
     * Business Layer needs to be provided
    */
    var startServer = function(bl){
        business = bl;
        initServer();
        var server = app.listen(8081, function () {
            var host = server.address().address
            var port = server.address().port
            console.log("App listening at http://%s:%s", host, port)
        })
    };

    return {
        startServer: startServer
    }
})();
