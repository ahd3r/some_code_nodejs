const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');

router.use(bodyParser.urlencoded());
router.get('/',(req,res,next)=>{
  res.render('admin.ejs');
});
router.get('/add_stuff',(req,res,next)=>{
  res.send('<form action="/admin/added" method="post"><input type="text" name="stuff"><button type="submit">Add</button></form>');
});
router.post('/added',(req,res,next)=>{
  fs.readFile('stuff_data.json',(err,data)=>{
    if(err){
      const newData=[req.body];
      fs.writeFile('stuff_data.json',JSON.stringify(newData),err=>{
        if(err){
          console.log(err);
          res.redirect('/');
        }else{
          res.redirect('/');
        }
      });
    } else {
      const newData=JSON.parse(data.toString());
      newData.push(req.body);
      fs.writeFile('stuff_data.json',JSON.stringify(newData),err=>{
        if(err){
          console.log(err);
          res.redirect('/');
        }else{
          res.redirect('/');
        }
      });
    }
  });
});

router.use('/', (req,res,next)=>{
  res.status(404).render('404_admin.pug');
});

module.exports = router;
