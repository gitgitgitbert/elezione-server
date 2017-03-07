
/** The beginning of elezione-server.
 * Next: 
 * - Handle events (nodejs tutorial p28) 
 * - read image files and add them to the data object 
 * - use some REST package 
 * - learn how to require own other files
 */


var http = require("http");
var fs = require("fs");

const DATAFILE = "data.json";

/** The current main element for elezione server */
var elezione = elezione || (function(){

  /** Variable for the folder data */
  var folderdata = {};
  folderdata.folders = [];
  
  /** Data Access: Read the file holding the current folders */
  var handleDataLoad = function(err, data){
    if (err){ 
      console.log(err);
      return;
    } else {
      initData(data);
    }
  }

  /** Business: init data from handled data object  */
  var initData = function(data){
    folderdata = JSON.parse(data);
  }

  /** Business(?) start the server that allows getting data */
  function startServer(){
    http.createServer(
      function(request, response){
        var resp = "Folder contains " + folderdata.folders.length + " folders"; 

        response.writeHead(200,{'Content-Type': 'text/plain'});
        response.end(resp);
      }
    ).listen(8081);
    console.log("Server Running at Port 8081");
  }

  /** Main entry point for this app */
  function start(){
    //Glue: Load data and setup elezione with it
    fs.readFile("data.json", handleDataLoad);
    //Glue: Start the server
    startServer();
  }

  return {
    start: start
  }
})();

//start elezione
elezione.start();


