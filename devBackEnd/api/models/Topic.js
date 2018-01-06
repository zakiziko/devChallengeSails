/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema : true,
  attributes: {
    name : {
      type : 'string'
    },
    description : {
      type : 'string'
    },
    upvoter : {
      collection : 'User',
      via : 'upvotedTopic'
    },
    comments : {
      collection : 'Comment',
      via : 'onTopic'
    },
    creator : {
      model : 'User'
    }
  },
  connection : 'mongodb'
};

