'use strict';

var Tieba = function(crawler) {
  this.crawler = crawler;
};

Tieba.prototype.fetchPinnedPosts = function(name, callback) {
  if (!this.crawler) {
    console.log('crawler is undefined');
    return;
  }

  console.log("Start to get pinned post for " + name);

  var url = "http://tieba.baidu.com/f?ie=utf-8&kw=" + encodeURIComponent(name);

  this.crawler.queue({
    uri: url,
    callback: function(error, result, $) {
      if (error) {
        console.log("Some error ocurred: " + error);
        callback();
        return;
      }

      var toplist = $('#thread_top_list');
      if (!toplist) {
        console.log("Get top list failed");
        callback();
        return;
      }

      var postList = new Array();
      $('.threadlist_title a', toplist)
        .each(function(index, a) {
          var postData = $(a);
          var post = {
            title: postData.attr('title'),
            link: "http://tieba.baidu.com" + postData.attr('href')
          };
          postList.push(post);
        });

      console.log("Done for " + name);
      callback(name, postList.reverse());
      return;
    }
  });
};

module.exports = Tieba;

