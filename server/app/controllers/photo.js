var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');
var mongoose = require('mongoose'),
Photo = mongoose.model('Photo');
multer = require('multer'),
mkdirp = require('mkdirp');

module.exports = function (app, config) {
    app.use('/api', router);


router.post('/gallery/photos/', function (req, res, next) {
    logger.log('Create Photo', 'verbose');
   var photo = new Photo(req.body);
    photo.save()
    .then(result => {
   res.status(201).json(result);
    })
   .catch(err => {
    return next(err);
    })
  });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
          var path = config.uploads + req.params.userId + "/" + req.params.galleryId + "/";
        mkdirp(path, function(err) {
            if(err){
                res.status(500).json(err);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.');   
        cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    }
  });

  var upload = multer({ storage: storage });
  router.post('/gallery/upload/:userId/:galleryId/:photoId', upload.any(), function(req, res, next){
      logger.log('Upload a photo ' + req.params.todoId + ' and ' + req.params.userId + ' and ' + req.params.galleryId, 'verbose');
      
  Photo.findById(req.params.photoId, function(err, photo){
          if(err){ 
              return next(err);
          } else {     
              if(req.files){
                  photo.file = {
                      filename : req.files[0].filename,
                      originalName : req.files[0].originalname,
                      dateUploaded : new Date()
                  };
              }           
              photo.save()
                  .then(photo => {
                      res.status(200).json(photo);
                  })
                  .catch(error => {
                      return next(error);
                  });
          }
      });
});

router.get('/users/gallery/:galleryId', function(req, res, next){
    logger.log('Get Photos in a Gallery ' + req.params.galleryId, 'verbose');
            Photo.find({galleryId: req.params.galleryId})
                .then(photo => {
                    if(photo){
                        res.status(200).json(photo);
                    } else {
                        res.status(404).json({message: "No Photo found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });  
     

router.put('/gallery/:galleryId/:photoId', function(req, res, next){
logger.log('Update Photo', + req.params.photoId,  'verbose');

  Photo.findOneAndUpdate({_id: req.params.photoId}, req.body, {new:true, multi:false})
      .then(photo => {
          res.status(200).json(photo);
      })
      .catch(error => {
          return next(error);
      });
}); 


router.delete('/gallery/:galleryId/:photoId', function(req, res, next){
logger.log('Delete Photo ', + req.params.photoId,  'verbose');

    Photo.remove({ _id: req.params.photoId })
        .then(photo => {
            res.status(200).json({msg: "Photo Deleted"});
        })
        .catch(error => {
            return next(error);
        });
});

}