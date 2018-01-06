/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find : function(req,res){
        Topic
        .find({})
        .sort({createdAt:-1})
        .populate('creator')
        .populate('comments')
        .populate('upvoter')
        .exec((err,topics)=>{
            if(err) return res.json({state:false});
            res.json({state:true,topics:topics});
  })
    },
    update : function(req,res){
        Topic.findOne(req.params.id).populate('upvoter').exec(function(err,topic){
            if(err){
               res.json({state:false});
            }else{
                var testOfAdd = topic.upvoter.length;
                topic.upvoter.add(req.body.id);
                topic.save(function(err){
                    if(err){
                        res.json({state:false});
                    }else{
                        /**
                         * @desc here we check if the update is well done or not
                         */
                        Topic.findOne(req.params.id).populate('upvoter').exec(function(err,updateTopic){
                            if(updateTopic.upvoter.length == testOfAdd){
                                res.json({state:false});
                            }else{
                                res.json({state:true});
                            }
                        })
                    }
                });
            }
        })
    }
};

