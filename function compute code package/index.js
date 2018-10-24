var nodemailer = require('nodemailer');

module.exports.handler = function (event, context, callback) {
  var evt = JSON.parse(event);
  console.log(JSON.stringify(evt));
  if (evt.events !== undefined) {
    callback(null, evt.events[0].oss.object.key);
  } else {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: '<YOUR EMAIL ID>',
        pass: '<YOUR EMAIL PASSWORD>'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
    });
    if (evt.doMail) {
      const mailOptions = {
        from: '<YOUR EMAIL ID>', // sender address
        to: evt.toMail, // list of receivers
        subject: 'Serverless Demo with OSS Event', // Subject line
        html: 'Hi '+(evt.firstname)+',<br><h1>'+(evt.message).toUpperCase()+'</h1>'// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          // callback(null, 'Mail Failed');
          callback(null, "Mail Failed :" + (evt.message).toUpperCase());
        } else {
          console.log(info);
          // callback(null, 'Mail Sent');
          callback(null, "Mail Sent :" + (evt.message).toUpperCase());
        }
      });
    } else {
      callback(null, (evt.message).toUpperCase());
    }
  }
};