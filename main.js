
/** The beginning of elezione-server.
 * Next: 
 * - Handle events (nodejs tutorial p28) 
 * - read image files and add them to the data object 
 * - use some REST package 
 */

var http = require("http");
var url = require("url");

var dataaccess = require("./data-access");
var restserver = require("./restserver");

/** The current main element for elezione server */
var elezione = elezione || (function(){

  /** Variable for the folder data */
  var folderdata = {};
  
  /** Business: init data from handled data object  */
  var initData = function(data){
    folderdata.folders = data.folders;
  }

  /** Main entry point for this app */
  function start(){
    //Glue: Load data and setup elezione with it
    dataaccess.loadModel(initData);
    //Glue: Start the server
    restserver.startServer(folderdata);
  }

  return {
    start: start
  }
})();

//start elezione
elezione.start();


