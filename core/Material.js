//素材相关接口
var request=require("request");
var Promise=require("bluebird");
var WeChat=require("./wechat");
var config=require("./config");
var fs=require("fs");
let prefix="https://api.weixin.qq.com/cgi-bin/material"
let api={
  materialList:prefix+"/batchget_material?"
  
};


function getMaterialList(){ 
  return new Promise((resolve,reject)=>{
      var wechat=new WeChat(config.wechat);
      wechat.getNowAccessToken(config.wechat).then((data)=>{
      var url=api.materialList+`access_token=${data.access_token}`;
      var formData={
        "type":"news",
        "offset":0,
        "count":20
      };
      //var json=JSON.stringify(formData);
//    request.post({url:url,formData:formData},function(err,response,body){
//      if(err) reject(err)
//      else resolve(body);
//    })
      request({
          url: url,
          method: "POST",
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: formData
      }, function(error, response, body) {
          resolve(body);
        }); 
    })
 })
}


exports.getMaterialList=getMaterialList;

