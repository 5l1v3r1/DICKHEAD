(function() {
  var open = XMLHttpRequest.prototype.open;
  var isScrolling;
  var titles = document.getElementById("dickheadify").getAttribute("titles");
  var dh = {1: "DICKHEAD", 2: "PROPER DICKHEAD", 3: "MASSIVE DICKHEAD", 4: "MEGA DICKEHAD", 5: "KING OF DICKHEADS"};
  var selectors = [
    "h1.pv-top-card-section__name",
    "span.feed-shared-post-meta__name > span",
    "a[data-control-name='update_topbar_actor'] > span",
    "a[data-control-name='comment_actor'] > span",
    ".pv-endorsement-entity__name > span",
    "span.search-typeahead-v2__hit-text"
  ];

  String.prototype.dickheadify = function() {
    var target = this;
    var re = new RegExp("\\b(" + titles.split(",").join("|") + ")\\b", 'g');
    var matches = target.match(re);
    var count = (matches || []).length;
    var title = dh[count] || dh[5];

    if (count > 1) {
      for (var i = 1; i < count; i++) {
        target = target.replace(matches[i], "");
      }
    }

    return target.replace(/(^[,\s]+)|([,\s]+$)/g, "").replace(re, title);
  };

  var checkForDickheads = function() {
    var textNodes = document.querySelectorAll(selectors.join(","));

    for (var i = 0, len = textNodes.length; i < len; i++) {
      textNodes[i].innerText = textNodes[i].innerText.dickheadify();
    }
  };

  window.addEventListener('scroll', function(event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      checkForDickheads();
    }, 100);
  }, false);

  XMLHttpRequest.prototype.open = function() {
    if (arguments[1].startsWith("/voyager/api")) {
      this.addEventListener('readystatechange', function(data) {
        if (this.readyState === 4) {
          checkForDickheads();
        }
      });
    }

    open.apply(this, Array.prototype.slice.call(arguments));
  };
})();
