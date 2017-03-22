//Not good: Business has to cope with return codes and stuff
var _ = require('lodash');

module.exports = (function(){
    /** Temporary place to hold data */
    var dummyData = {};

    function getFolders(){
        if(dummyData){
            return dummyData;
        } else {
            return undefined;
        }
    }

    function getSpecificFolder(id){
        console.log("Specific Folder requested");
        
        if(dummyData && dummyData.folders){
            var element = _.find(dummyData.folders, function(o){return o.id == id;});
            return element;
        } else {
            return undefined;
        }
    }

    function addFolder(req, res) {
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
    }

    function getSpecificImageSet(req,res){}
    function addImageSet(req,res){}

    return {
        dummyData: dummyData,
        getFolders:getFolders,
        getSpecificFolder:getSpecificFolder,
        addFolder: addFolder,
        getSpecificImageSet: getSpecificImageSet,
        addImageSet, addImageSet
    }
})();