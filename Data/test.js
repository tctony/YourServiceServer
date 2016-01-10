var t = require('./TiebaPinnedPost');

t.list('wow', function(docs){
});

t.deleteAll('wow', function() {

});

t.update('wow', [ { title: 'aaa', link: '123' } ], function(newpost) {
  
});

