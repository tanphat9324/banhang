var express = require('express');
var router = express.Router();
var danhsachModel=require('../model/danhsach');
var multer  = require('multer')
const path=require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Luong Tan Phat' });
// });
/* Xem du lieu. */
router.get('/', function(req, res, next) {
  danhsachModel.find({},function(err,dulieu){
    res.render('index', { title: 'Trang chu',data:dulieu });    
  })
});

/*Quan tri page. */
router.get('/quantri', function(req, res, next) {
  danhsachModel.find({},function(err,dulieu){
    res.render('quantri', { title: 'Trang Quản Trị',data:dulieu });    
  })});

/* Xoa du lieu. */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id= req.params.idcanxoa;
  danhsachModel.findByIdAndRemove(id).exec();
    res.redirect('/quantri');
});
/* Sua du lieu. */
router.get('/quantrisua/:idcansua', function(req, res, next) {
  var id2 = req.params.idcansua;
  danhsachModel.find({ _id : id2 },function(err,dulieu){
      res.render('quantrisua',{title:"Sua du lieu",data:dulieu})
    })
});
/* Sua du lieu post */
router.post('/quantrisua/:idcansua',upload.single('anhsp'), function(req, res, next) {
  var id2 = req.params.idcansua;
  
  danhsachModel.findById(id2,function(err,dulieu){
    if(err) return handleError(err);
    // console.log(dulieu,"file du lieu");
    
    dulieu.cat=req.body.cat;
    console.log(dulieu.cat);
    dulieu.info=req.body.info;
    dulieu.anhsp=req.file.filename;
    dulieu.title=req.body.title; 
    dulieu.price=req.body.price; 
    dulieu.discount=req.body.discount; 
    // console.log(dulieu,"Post du lieu",req.body);
    dulieu.save();
    res.redirect('/');
  });
  
});

/* Them du lieu. */
router.get('/quantriThem', function(req, res, next) {
  res.render('quantriThem', { title: 'Them moi du lieu' });
});
/* Them du lieu. */
router.post('/quantriThem',upload.single('anhsp'), function(req, res, next) {
var phantu={
    'cat':req.body.cat,
    'title': req.body.title, 
    'info': req.body.info,
    'anhsp':req.file.filename,
    'price':req.body.price,
    'discount':req.body.discount
}
// console.log("Post du lieu",req.body);
var dulieu=new danhsachModel(phantu);
dulieu.save()
// console.log(req.file);
res.redirect('/')
});

module.exports = router;
