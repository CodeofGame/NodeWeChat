var Koa=require("koa");
var Promise=require("bluebird");
var core=require("./core/global");
var config=require("./core/config");



var app=new Koa();




app.use(core(config.wechat));


app.listen(3000);

console.log("server is running at 3000!");

