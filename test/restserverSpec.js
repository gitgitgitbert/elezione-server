/** These tests require that the server is active, it is more like an e2e
 * test (?)
 */

var request = require('request');

var host = "http://localhost:8081";

//Sample Test
exports.folderlisting = function(test){
    test.expect(3);
    request.get(host + "/folders", function (err, resp, body) {
        test.equal(err, null);
        test.equal(resp.statusCode, 200);
        var r = JSON.parse(body);
        test.equal(r.error, null);
        test.done();
    });
};