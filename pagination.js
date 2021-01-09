// immediately/self invoked function. This function executes right away
(function() {
  // create a new Library instance and store it in a variable called "fsPreviousNext"
  var fsPreviousNext= new FsLibrary('.post-list-hidden')  // Class of your CMS collection list to search for previous/next

  // run prevNext on our instance
  fsPreviousNext.prevnext({
    nextTarget: ".post-next-target",  // the div that the Next item should go
    previousTarget: ".post-prev-target",  // the div that the Previous item should go
    contentId: ".article-template-title",  // the unique id that identifies which item in your CMS Collection is the current item
  })
})();
