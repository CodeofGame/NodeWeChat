var fs=require("fs");
var path=require("path");
var Promise=require("bluebird");
var accessTokenFile=path.join(__dirname,"../config/accessToken.txt");

var config={
  wechat:{
    appID:"wx2ea795e409b2c674",
    appsecret:"e4632492abb3de0943fc7ca20c4b27d0",
    token:"wechat",
    //从文件中读取access_token
    getAccessToken:function(){
        return new Promise((resolve,reject)=>{
          fs.readFile(accessTokenFile,"utf-8",(err,data)=>{
            if(err) reject(err);
            else resolve(data);
          })

        });
    },
    //将最新的access_token写入文件
    saveAccessToken:function(data){
      return new Promise((resolve,reject)=>{
        fs.writeFile(accessTokenFile,JSON.stringify(data),(err)=>{
          if(err) reject(err);
          else resolve(data);
        })
      });
    }
  }
};


module.exports=config;