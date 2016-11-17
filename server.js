var express = require('express');
var path = require("path");
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var app = express();

var transporter = nodemailer.createTransport(smtp({
    debug: true,
    host: "outbound.cisco.com"
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public' + '/index.htm'));
});
app.post('/getPdf', function (req, res) {

    var timeStamp = new Date().getTime();
    var pageurl = req.body.pageurl;
    
    const spawn = require('child_process').spawn;
    var child = spawn(binPath, [path.join(__dirname + '/phantompdf.js'), timeStamp, pageurl]);
    child.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
    //spit stderr to screen
    child.stderr.on('data', function (data) { process.stdout.write(data.toString()); });
    child.on('close', function (code) {
        var mailData = {
            from: 'assessment@gmail.com',
            to: req.body.email,
            subject: 'Security Assessment Report',
            html: 'Please view your Digital Security Assessment Report attached. For more information on our security solutions, please visit: <a href="www.cisco.com/go/security" target="_blank">www.cisco.com/go/security</a><br/><br/>Thanks,<br/>Cisco',
            attachments: [
                {
                    filename: timeStamp + ".pdf",
                    path: timeStamp + ".pdf",
                    contentType: "application/pdf",
                    contentDisposition: 'attachment'
                }
            ]
        };
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log("MAILER INFO ==>", info);
            // do stuff here
            transporter.close();

        });
        res.sendFile(path.join(__dirname + '/public' + '/index.htm'));
        console.log("Finished with code " + code);
    });


});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});