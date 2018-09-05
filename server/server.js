'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const nodemailer = require('nodemailer');



var app = module.exports = loopback();

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/sentemail/:email/:id', function(req, res, next) {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "es.vstecs@gmail.com", // generated ethereal user
            pass: "qwerty00--" // generated ethereal password
        }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Robot 🗿" <es.vstecs@gmail.com>', // sender address
        to: req.params.email, // list of receivers
        subject: 'สวัสดีครับ Email จาก Robot 🗿', // Subject line
        text: 'คุณสามารเข้า Link QR Code ที่ http://client.fuangmali.info:8081/email/'+req.params.id, // plain text body
        html: '<b>คุณสามารเข้า Link QR Code ที่ http://client.fuangmali.info:8081/email/'+req.params.id+' </b>'  // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
  // res(alert('รบกวนตรวจสอบ Email:'+req.params.email)); 
  res.redirect('/');
});

app.get('/email/:id', function(req, res, next) {
  res.render('index', {
    site:{
      title:"test",
    },
    id: req.params.id,
  });
  // res.redirect('/');
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
