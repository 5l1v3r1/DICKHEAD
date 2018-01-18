(function() {
  fetch(chrome.extension.getURL("dickheadifiers.txt"))
    .then(response => response.text())
    .then(text => init(text.trim().split("\n")));

  var init = function(titles) {
    var script = document.createElement('script');
    script.id = 'dickheadify';
    script.src = chrome.extension.getURL('run.js');
    script.setAttribute('titles', titles);
    document.documentElement.appendChild(script);
  };
})();
