//Not good: Business has to cope with return codes and stuff
var _ = require('lodash');

module.exports = (function(){
    /** Temporary place to hold data */
    var dummyData = {};

    function getFolders(successCallback){
        return successCallback(dummyData);
    }

    function getSpecificFolder(id, successCallback){
        if(dummyData && dummyData.folders){
            var element = _.find(dummyData.folders, function(o){return o.id == id;});
            successCallback(element);
        } else {
            successCallback(undefined);
        }
    }

    function addFolder(data, callback) {
        //add data to folder collection
        console.log("Would add this to the collection: " + JSON.stringify(data));
        //do stuff...
        var addedItem = {"dummy":"dummycontent"};
        callback(addedItem);
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