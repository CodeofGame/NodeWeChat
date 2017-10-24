exports.formatMessage=function(xmlObjext){
  var msg={};
  if(typeof(xmlObjext)==="object"){
    for(let attr in xmlObjext.xml){
      msg[attr]=xmlObjext.xml[attr][0];
    }
  }
  return msg; 
}

exports.formTextMessage=formTextMessage;


//封装回复的消息
function formTextMessage(msg,content=""){
     var reponse = `<xml>
              <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
              <CreateTime>12345678</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${content}]]></Content>
              </xml>`;
     return reponse;
}


//消息的抽象工厂
function MessageFactory(){
  
  
}



