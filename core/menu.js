//生成菜单，现在先写死
var fs=require("fs");

var path=require("path");
var Promise=require("bluebird");
var request=require("request");
var WeChat=require("./wechat");
var config=require("./config");
var menuPath=path.join(__dirname,"../config/menu.txt");


function getMenu(){
	return new Promise((resolve,reject)=>{
		fs.readFile(menuPath,"utf-8",(err,data)=>{
			if(err) reject(err);
			else resolve(data);
		})
	})
}


exports.createMenu=function(){
	
	var wechat=new WeChat(config.wechat);
	
	wechat.getNowAccessToken(config.wechat).then((data)=>{
		var url=`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
		//var menuContent=fs.readFileSync(menuPath,"utf-8");
		var menubody={
			"button":[
				{
					"type":"view",
          			"name":"缴费",
          			"url":"http://mp.weixin.qq.com/bizmall/mallshelf?id=&t=mall/list&biz=MzI3NzcyOTU0MQ==&shelf_id=1&showwxpaytitle=1#wechat_redirect"
				},
				{
					"type":"view_limited",
					"name":"全国奥数比赛",
					"media_id":"dlvq3irQ4OoRH9J36bPZmzBMh6LsDLG_5H_03DPjxtY"
				}
			]
		};
		request({
          url: url,
          method: "POST",
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: menubody
      }, function(error, response, body) {
          	console.log(body);
        }); 
	})
	
}
