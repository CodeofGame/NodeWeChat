
var Promise=require("bluebird");
//request的Promise化
var request=require("request");


var prefix="https://api.weixin.qq.com/cgi-bin";

var api={
  access_token:prefix+"/token?grant_type=client_credential&"
}

//票据的读取和写入
function WeChat(options){
    var me=this;
    this.appID=options.appID;
    this.appsecret=options.appsecret;
    
    this.getNowAccessToken(options).then((data)=>{
      
    });
  
}

WeChat.prototype={
  isAccessTokenValidate:function(data){
    if(!data || !data.access_token || !data.expires_in){
      return false;
    }
    else{
      var expiresIn=data.expires_in;
      var now=new Date().getTime();
      return now < expiresIn ? true :false;
    }
  },
  updateAccessToken:function(){
    var appID=this.appID;
    var appsecret=this.appsecret;
    var url=api.access_token+`appID=${appID}&secret=${appsecret}`;
    return new Promise((resolve,reject)=>{
       request(url,function(err, response, body){
          if(err){
            reject(err);
          }
          else{
            let accessToken=JSON.parse(body);
            let data={
              access_token:accessToken.access_token,
              expires_in:(new Date()).getTime() + (accessToken.expires_in - 20) * 1000
            };
           resolve(data);                  
          }
        })
    })
  },
  getNowAccessToken:function(options){
      var me=this;
      return new Promise((resolve,reject)=>{
        options.getAccessToken()
        .then((data)=>{
          try{
            //转成对象
            data=JSON.parse(data);
          }
          catch(e){
              //更新access_token
              return me.updateAccessToken();
          }
          //判断access_token是否合法
          if(!me.isAccessTokenValidate(data)){
              return me.updateAccessToken();
          }
          else{
              return Promise.resolve(data);
          }
        })
        .then((data)=>{
            options.saveAccessToken(data);
            resolve(data);
        });
      });
    }
  
};





module.exports=WeChat;