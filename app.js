var Koa=require("koa");
var Promise=require("bluebird");
var path=require("path");
var fs=require("fs");
var core=require("./core/global");
var config=require("./core/config");

var accessTokenFile=path.join(__dirname,"./config/accessToken.txt");

var app=new Koa();




app.use(core(config.wechat));


app.listen(3000);

console.log("server is running at 3000!");

