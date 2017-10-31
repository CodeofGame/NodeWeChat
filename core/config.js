var fs=require("fs");
var path=require("path");
var Promise=require("bluebird");
var accessTokenFile=path.join(__dirname,"../config/accessToken.txt");

var config={
  wechat:{
    appID:"wx4340533ee0d65771",
    appsecret:"f19b5dee7113f591beb3efc6a04383eb",
    token:"saishi",
    EncodingAESKey:"WzfIW8sUIaelFrn7uvMtmkHEp77y2L8YgrHW74RujLF",
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