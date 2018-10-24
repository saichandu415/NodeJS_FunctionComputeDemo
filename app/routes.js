var alioss = require('ali-oss');
var fc = require('@alicloud/fc');
var keyInfo = require('../config/keyInfo.json');

const store = alioss({
    accessKeyId: keyInfo.accessKeyId,
    accessKeySecret: keyInfo.accessKeySecret,
    bucket: keyInfo.bucket,
    region: keyInfo.oss_region
});

var client = new fc(keyInfo.accountId, {
    accessKeyID: keyInfo.accessKeyId,
    accessKeySecret: keyInfo.accessKeySecret,
    region: keyInfo.region,
    timeout: 30000 // Request timeout in milliseconds, default is 10s
});

var serviceName = keyInfo.fc_serviceName;
var funcName = keyInfo.fc_funcName;


module.exports = function (app) {
    app.get('/api/todos', function (req, res) {

        var invokeReq = {
            message : 'this function is invoked'
        }
        
        var funcRes = {
            message : ''
        }
        
        client.invokeFunction(serviceName, funcName, JSON.stringify(invokeReq)).then(function(response){
            res.setHeader('Content-Type', 'application/json');
            funcRes.message = response;
            res.send(JSON.stringify(funcRes));
        });        
    });

    app.post('/api/todos', function (req, res) {
        console.log(req.body);
        var filepath = '/Users/sarathchandrap/Desktop/testData/' + req.body.filepath;
        store.put(req.body.filepath, filepath).then((result) => {
            console.log(result);
            res.send(result);
        });
    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file 
    });
};
