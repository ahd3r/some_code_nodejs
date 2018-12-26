const fs = require('fs');

const routesRes=(req,res)=>{
  if(req.url==='/' && req.method==='GET'){
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>Test</title></head><body><form action="/msg" method="post"><input name="message" type="text"/><br><input name="password" type="password"/><br><button type="submit">Send</button></form>');
    // res.write('<form action="/msg" method="post"><input name="message2" type="text"/><button type="submit">Send</button></form>'); // which submit will click, that data will send
    res.write('</body></html>');
    return res.end();
  }
  if(req.url==='/msg' && req.method==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
      body.push(chunk);
    });
    return req.on('end',()=>{
      const parserBody = Buffer.concat(body).toString();
      const message = parserBody.split('&');
      const resMessage=message[0];
      const resultMessage=resMessage.split('=')[1];
      const pass = message[1];
      const password = pass.split('=')[1]
      const cheak=/[%3D,+]/;
      if(cheak.test(resultMessage)||cheak.test(password)){
        console.log('You can\'t use sign');
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
      }else{
        console.log(resultMessage,password);
        fs.appendFile('messages.txt',`${message}\n`,err=>{
          res.statusCode=302;
          res.setHeader('Location','/');
          return res.end();
        });
      }
    });
  }
  res.setHeader('Content-Type','text/html');
  res.write('<html><head><title>Test</title></head><body><h1>Back to home page (404)</h1></body></html>');
  res.end();
  // console.log(req.url, req.method, req.headers);
};

module.exports=routesRes;
