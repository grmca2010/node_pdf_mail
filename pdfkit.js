var PDF = require('pdfkit');
var fs = require('fs');
var text = "Your network is vulnerable to threats. Advanced attacks can cause severe damage to your organization's data and potentially lead to financial loss. We recommend you look at security holistically from before (reducing attack surface and controlling traffic), during (combat inbound and advanced threats like malware) and after (remediation/quarantine in case of malware outbreak) an attack. Also automation can help you reduceoperational overhead.";
var networktext="Your network is vulnerable to threats. Advanced attacks can cause severe damage to your organization's data and potentially lead to financial loss. We recommend you look at security holistically from before (reducing attack surface and controlling traffic), during (combat inbound and advanced threats like malware) and after (remediation/quarantine in case of malware outbreak) an attack. Also automation can help you reduce operational overhead."
doc = new PDF();                        //creating a new PDF object
doc.pipe(fs.createWriteStream('output.pdf'));
doc.fontSize(20).text("Security Assessment", 30, 50);
doc.fontSize(9).text("Contact: 18005559090",430, 60);
doc.save()
   .moveTo(0, 82)
   .lineTo(900,82)
   .fill("#C0C0C0");
doc.fill("#808080").fontSize(10).text('Your security score is...',250,112);
doc.fontSize(13).text('Not good and is highly vulnerable to threats',170,135);
doc.fill("#FFA500").fontSize(45).text('30%',270,167);
doc.fill("#808080").fontSize(10).text(networktext,70,235);
doc.save()
   .moveTo(0, 316)
   .lineTo(900,316)
   .fill("#C0C0C0");

doc.save().fill("#808080").fontSize(22).text('We recommend…',230,345);
doc.save().fill("#808080").fontSize(21).text('Enhanced',60,395);
doc.save().fill("#808080").fontSize(10).text("You need to address targeted attacks and sophisticated threats. Comprehensive software features plus hardware with medium to high throughput will best serve your needs. Responding rapidly to threats and hardware issues is important to you. Your IT department has limited security expertise. You likely use nextgeneration firewalls (NGFWs) to perform core tasks. You require more tailored support for migration, deployment, and integration. Your skilled staff takes actions based on product prompts, and uses third-party support for complex issues.",60,440);

doc.end(); //we end the document writing.
