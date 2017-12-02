var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
    var mongoose = require('mongoose'),
    Gallery = mongoose.model('Gallery');

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

    
    }
