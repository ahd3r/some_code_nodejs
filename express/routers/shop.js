const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/',(req,res,next)=>{
  res.render('shop.ejs');
});
router.get('/stuff',(req,res,next)=>{
  fs.readFile('stuff_data.json',(err,data)=>{
    if(err){
      res.send('<h1>No data</h1>');
    }else{
      const stuffData = JSON.parse(data);
      res.render('stuff.ejs',{stuffData:stuffData});
      // stuffData.forEach(stuff => {
      //   res.write(`<p>${stuff.stuff}</p>`);
      // });
      // res.send();
    }
  });
});

router.use('/',(req,res,next)=>{
  res.status(404).render('404_shop.pug');
});

module.exports = router;
