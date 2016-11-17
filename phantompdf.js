var page = require('webpage').create();
var system = require('system');
var args = system.args;
page.open(args[2]);
page.viewportSize = { width: 1080, height: 800 };
page.paperSize = {
  width: '600px',
  height: '300px',
  margin: {
    top: '0px',
    left: '0px',
    bottom:'0px',
    right:'0px'
  }
};
page.onLoadFinished = function(status) {    
      page.render(args[1]+".pdf",{format: 'pdf',quality: '100'});
      phantom.exit();

};
