var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
    var mongoose = require('mongoose'),
    Gallery = mongoose.model('Gallery');
    multer = require('multer'),
    mkdirp = require('mkdirp');

  module.exports = function (app, config) {
      app.use('/api', router);

      router.post('/gallery', function (req, res, next) {
         logger.log('Create New Gallery', 'verbose');
        var gallery = new Gallery(req.body);
         gallery.save()
         .then(result => {
        res.status(201).json(result);
         })
        .catch(err => {
         return next(err);
         })
       });
          
   /**   router.get('/todo', function(req, res, next){
         logger.log('Get all todo', 'verbose');

          var query = Todo.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No Todos"});
          }
          })
          .catch(err => {
            return next(err);
          });
      }) 
 
      router.get('/todo/:todoId', function(req, res, next){
        logger.log('Get Todo ' + req.params.todoId, 'verbose');
                Todo.findById(req.params.todoId)
                    .then(todo => {
                        if(todo){
                            res.status(200).json(todo);
                        } else {
                            res.status(404).json({message: "No Todo found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });    **/    

            router.get('/gallery/:userId', function(req, res, next){
                logger.log('Get Gallery ' + req.params.userId, 'verbose');
                        Gallery.find({userId: req.params.userId})
                            .then(gallery => {
                                if(gallery){
                                    res.status(200).json(gallery);
                                } else {
                                    res.status(404).json({message: "No Gallery found"});
                                }
                            })
                            .catch(error => {
                                return next(error);
                            });
                    });  
                 

router.put('/gallery/:galleryId', function(req, res, next){
          logger.log('Update Gallery', + req.params.galleryId,  'verbose');
     
              Gallery.findOneAndUpdate({_id: req.params.galleryId}, req.body, {new:true, multi:false})
                  .then(gallery => {
                      res.status(200).json(gallery);
                  })
                  .catch(error => {
                      return next(error);
                  });
          }); 
         
  
          router.delete('/gallery/:galleryId', function(req, res, next){
            logger.log('Delete Gallery ', + req.params.galleryId,  'verbose');
       
                Gallery.remove({ _id: req.params.galleryId })
                    .then(gallery => {
                        res.status(200).json({msg: "Gallery Deleted"});
                    })
                    .catch(error => {
                        return next(error);
                    });
    });

var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
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
      router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
          logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
          
          Todo.findById(req.params.todoId, function(err, todo){
              if(err){ 
                  return next(err);
              } else {     
                  if(req.files){
                      todo.file = {
                          filename : req.files[0].filename,
                          originalName : req.files[0].originalname,
                          dateUploaded : new Date()
                      };
                  }           
                  todo.save()
                      .then(todo => {
                          res.status(200).json(todo);
                      })
                      .catch(error => {
                          return next(error);
                      });
              }
          });
  });
      
    
    }
