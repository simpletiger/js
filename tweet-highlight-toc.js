/*
 * TweetHighlighted - jQuery plugin that brings a 'tweet' button
 *                    when text is selected.
 *
 */
(function ($) {
    $.fn.tweetHighlighted = function(options) {
        var settings = {}, classes;
        options = options || {};

        // html DOM element to use as a button
        settings.node = options.node || '<button type="button">Tweet</button>';
        // css class to add to the html node
        settings.cssClass = options.cssClass || 'tweet-me';
        // minimum length of the selected text for the tweet button to appear
        settings.minLength = options.minLength || 1;
        // maximum length of the selected text for the tweet button to appear
        settings.maxLength = options.maxLength || 144 * 4;
        // extra content to attach (mostly used to add URLs)
        settings.extra = options.extra || '';
        // twitter 'via' handle
        // (basically appends 'via @twitterhandle' to the tweet)
        settings.via = options.via || null;
        // arguments to pass to the window.open() function
        settings.popupArgs = options.popArgs || 'width=400,height=400,toolbar=0,location=0';
        // defines a callback function to pass text to when a user takes action
        settings.callback = options.callback || null;

        // get an array of classes filtering out empty whitespaces
        classes = settings.cssClass.split(' ').filter(function(item) {
                                                        return item.length;
                                                      });
        settings._selector = '.' + classes.join('.');

        // event that fires when any non-empty text is selected
        var onTextSelect = function(selector, callback) {
            function getSelectedText() {
              if (window.getSelection) {
                    return window.getSelection().toString();
              } else if (document.selection) {
                return document.selection.createRange().text;
              } 
              return '';
            };

            // fires the callback when text is selected
            $(selector).mouseup(function(e) {
              var text = getSelectedText();
              if (text !== '') {
                callback(e, text);
              }
            });

            // removes the button when the selected text loses focus
            $(document).click(function(e) {
              var text = getSelectedText();
              if (text !== '') {
                e.stopPropagation();
              }
              else
                $(settings._selector).fadeOut(500).remove();
            });
        };

        var getTweetURL = function(text, extra, via) {
            var url = 'https://twitter.com/intent/tweet?text=';
            url += encodeURIComponent(text);

           if (extra)
                url += encodeURIComponent(' ' + extra);

            if (via)
                url += '&via=' + via;

            return url;
        };

        onTextSelect(this, function(e, text) {
            var btnExists = $(settings._selector).length, url;

            if (btnExists || text.length > settings.maxLength
                || text.length < settings.minLength)
                return;

            url = getTweetURL(text, settings.extra, settings.via);
            $(settings.node).addClass(settings.cssClass
             ).offset({top: e.pageY,
                       left: e.pageX}
             ).css({position: 'absolute',
                    cursor: 'pointer'}
             ).appendTo('body'
             ).fadeIn(500
             ).click(function(e) {
                 $(settings._selector).fadeOut(500).remove();
                 // Open the tweet window
                 window.open(url, '_blank', settings.popupArgs);
                 // Notify the callback function if defined
                 if( settings.callback != null ){
                   settings.callback(text);
                 }
             });
        });      
    };
})(jQuery);



$('body').tweetHighlighted({
                             
  node: '<a href="#" class="tweet-button tweet">Tweet</a>',
  minLength: 6,
  maxLength: 240 * 2,
  extra: 'https://simpletiger.com/saas-seo-guide',
  via: 'simpletiger',
  popupArgs: 'width=600,height=600,toolbar=0,location=0'

});



 /*!
 * toc - jQuery Table of Contents Plugin
 * v0.3.2
 * http://projects.jga.me/toc/
 * copyright Greg Allen 2014
 * MIT License
*/
!function(a){a.fn.smoothScroller=function(b){b=a.extend({},a.fn.smoothScroller.defaults,b);var c=a(this);return a(b.scrollEl).animate({scrollTop:c.offset().top-a(b.scrollEl).offset().top-b.offset},b.speed,b.ease,function(){var a=c.attr("id");a.length&&(history.pushState?history.pushState(null,null,"#"+a):document.location.hash=a),c.trigger("smoothScrollerComplete")}),this},a.fn.smoothScroller.defaults={speed:400,ease:"swing",scrollEl:"body,html",offset:0},a("body").on("click","[data-smoothscroller]",function(b){b.preventDefault();var c=a(this).attr("href");0===c.indexOf("#")&&a(c).smoothScroller()})}(jQuery),function(a){var b={};a.fn.toc=function(b){var c,d=this,e=a.extend({},jQuery.fn.toc.defaults,b),f=a(e.container),g=a(e.selectors,f),h=[],i=e.activeClass,j=function(b,c){if(e.smoothScrolling&&"function"==typeof e.smoothScrolling){b.preventDefault();var f=a(b.target).attr("href");e.smoothScrolling(f,e,c)}a("li",d).removeClass(i),a(b.target).parent().addClass(i)},k=function(){c&&clearTimeout(c),c=setTimeout(function(){for(var b,c=a(window).scrollTop(),f=Number.MAX_VALUE,g=0,j=0,k=h.length;k>j;j++){var l=Math.abs(h[j]-c);f>l&&(g=j,f=l)}a("li",d).removeClass(i),b=a("li:eq("+g+")",d).addClass(i),e.onHighlight(b)},50)};return e.highlightOnScroll&&(a(window).bind("scroll",k),k()),this.each(function(){var b=a(this),c=a(e.listType);g.each(function(d,f){var g=a(f);h.push(g.offset().top-e.highlightOffset);var i=e.anchorName(d,f,e.prefix);if(f.id!==i){a("<span/>").attr("id",i).insertBefore(g)}var l=a("<a/>").text(e.headerText(d,f,g)).attr("href","#"+i).bind("click",function(c){a(window).unbind("scroll",k),j(c,function(){a(window).bind("scroll",k)}),b.trigger("selected",a(this).attr("href"))}),m=a("<li/>").addClass(e.itemClass(d,f,g,e.prefix)).append(l);c.append(m)}),b.html(c)})},jQuery.fn.toc.defaults={container:"body",listType:"<ul/>",selectors:"h1,h2,h3",smoothScrolling:function(b,c,d){a(b).smoothScroller({offset:c.scrollToOffset}).on("smoothScrollerComplete",function(){d()})},scrollToOffset:0,prefix:"toc",activeClass:"toc-active",onHighlight:function(){},highlightOnScroll:!0,highlightOffset:100,anchorName:function(c,d,e){if(d.id.length)return d.id;var f=a(d).text().replace(/[^a-z0-9]/gi," ").replace(/\s+/g,"-").toLowerCase();if(b[f]){for(var g=2;b[f+g];)g++;f=f+"-"+g}return b[f]=!0,e+"-"+f},headerText:function(a,b,c){return c.text()},itemClass:function(a,b,c,d){return d+"-"+c[0].tagName.toLowerCase()}}}(jQuery);



/* initialize toc plugin */
$('.toc').toc({
    'selectors': 'h1,h2,h3,h4,h5,h6', //elements to use as headings
    'container': '.blog-body', //element to find all selectors in
    'prefix': 'toc', //prefix for anchor tags and class names
    'highlightOnScroll': true, //add class to heading that is currently in focus
    'highlightOffset': 100, //offset to trigger the next headline
 });
