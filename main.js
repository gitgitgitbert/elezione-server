
/** The beginning of elezione-server.
 * Next: 
 * - Handle events (nodejs tutorial p28) 
 * - read image files and add them to the data object 
 */

var http = require("http");
var url = require("url");

var dataaccess = require("./data-access");
var restserver = require("./restserver");
var business = require("./business");

/** The current main element for elezione server */
var elezione = elezione || (function(){  
  /** Business: init data from handled data object  */
  var initData = function(data){
    business.dummyData.folders = data.folders;
  }

  /** Main entry point for this app */
  function start(){
    //Glue: Load data and setup elezione with it
    dataaccess.loadModel(initData);
    //Glue: Start the server
    restserver.startServer(business);
  }

  return {
    start: start
  }
})();

//start elezione
elezione.start();


