var page = require('webpage').create();
var system = require('system');
var args = system.args;
console.log(args);
console.log(args[0],args[1],args[2]);
page.open(args[2], function(status) {
  console.log("pdf created---------->");
  page.render(args[1]+".pdf");
  phantom.exit();
});