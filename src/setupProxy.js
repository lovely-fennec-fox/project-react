const proxy = require('http-proxy-middleware');
const ipaddress = 'localhost';
module.exports = function(app){
    app.use(
        proxy('/server',{
            target:`http://${ipaddress}:5000`
        })
    )
}

