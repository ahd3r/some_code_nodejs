const express = require('express');
const app = express();
const admin = require('./routers/admin');
const shop = require('./routers/shop');
const path = require('path');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

// app.engine('hbs', expressHbs());
// app.set('views engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());

app.use('/admin',admin); // admin
app.use(shop); // shop ('/')

// app.use('/',(req,res,next)=>{
//   res.status(404).send('<h1>Error 404<br>Page not found</h1>');
// });

app.listen(3000,()=>{
  console.log('Runing...');
}); // http://127.0.0.1:3000/
