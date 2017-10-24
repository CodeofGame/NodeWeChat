var sha1=require("sha1");
let xmlParse = require("./xmlHelper");
var WeChat=require("./wechat");
var message=require("./message");
var querystring=require("querystring");
var request=require("request");
var material=require("./Material");


module.exports = function(options) {

  var wechat = new WeChat(options);
  
  return async function(ctx) {
    console.log("请求进来了...");
    var wechat = new WeChat(options);
    console.log("access_token"+wechat.access_token);
    let token = options.token;
    let signature = ctx.query.signature;
    let timestamp = ctx.query.timestamp;
    let nonce = ctx.query.nonce;
    let echostr = ctx.query.echostr;
    let str = [token, timestamp, nonce].sort().join("");
    let sha1Str = sha1(str);

    if(ctx.method === "GET") {
      if(sha1Str === signature) {
        ctx.body = echostr;
      } else {
        ctx.body = "我们只接收来自微信的请求哦！！";
      }
    } else if(ctx.method === "POST") {
      if(sha1Str !== signature) {
        ctx.body = "我们只接收来自微信的请求哦！！";
      } 
      else {
        var x = await test(ctx);
        ctx.body = x;
      }
    }

  }
}

function test(ctx) {
  return new Promise(function(resolve, reject) {
    let postdata = "";

    ctx.req.addListener('data', (data) => {
      postdata += data
    });

    ctx.req.addListener("end", function() {
       
      xmlParse.xmlToObjext(postdata, function(result) {
        let msg = message.formatMessage(result);
        console.log(msg);
        let reponse = "";
        if(msg.MsgType === "text") {
          var content= msg.Content;
          var v=treatUserText(content);
          reponse=message.formTextMessage(msg,v)
          //聊天机器人先注掉
      //        chatRobot(content).then(function(v) {
          //reponse=message.formTextMessage(msg,v);
          resolve(reponse);
          //});
        }
        else if(msg.MsgType === "event"){
             //关注事件
             if(msg.Event === "subscribe"){
               var content="欢迎关注我的公众号！<a href='http://www.baidu.com'>关于我们</a>\n谢谢了";
               reponse=message.formTextMessage(msg,content);
               resolve(reponse);
             }
        }
      });

    })
  })
}

function chatRobot(question) {
  return new Promise(function(resolve, reject) {
    var qs = querystring.stringify({
      question: question
    });
    let url = "http://jisuznwd.market.alicloudapi.com/iqa/query?" + qs;
    let appCode = "dcf8a5beb7c447ef9ff3e6cf354bfb71";
    request({
      url: url,
      json: true,
      headers: {
        'Authorization': 'APPCODE ' + appCode
      },
    }, function(error, response, body) {

      if(!error && response.statusCode === 200) {
        resolve(body.result.content) // Print the json response
      }
    })
  })
}

function treatUserText(content){ 
  var result="";
  if(content =="1"){
    result = "你好"
  } 
  else if(content =="2")
   result = "上午好"
  else if(content == "4"){
    material.getMaterialList().then((data)=>{
      console.log(data);
    });
  
  }
  else
    result="默认值";
  return result;
}