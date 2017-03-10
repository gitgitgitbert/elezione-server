/** Data Access Module 
 * What i dont like: Its a direct implementation and i would prefer some kind of abstract layer
 * so that i can quickly change this to e.g. mongoDb
*/

var fs = require("fs");

module.exports = (function(){
    /** Path where our data model currently is */
    const DATAPATH = __dirname + "/" + "data.json";
    const ENCODING = "utf8";

    /** Load the "data model". Provide the callback to add the loaded 
     * object(s) to some main variable. 
     * What could be better: Use events to communicate instead of direct callbacks
     */
    function loadModel(successCb)
    {
        fs.readFile(
            DATAPATH,
            ENCODING, 
            function(err,data){
                _handleDataLoad(err,data,successCb);
            }
        );
    }


    /** Data Access: Read the file holding the current folders 
     * What i dont like: we did not define what successCb's 
     * method signature should be 
    */
    var _handleDataLoad = function(err, data, successCb){
        if (err){ 
            console.log(err);
            return;
        } else {
            var parsedData = JSON.parse(data);
            console.log('Loaded: ' + JSON.stringify(parsedData));
            successCb(parsedData);
        }
    }

    return {
        loadModel: loadModel
    }    
})()