module.exports = function(MyModel) {
    // send an email
    MyModel.sendEmail = function(cb) {
      MyModel.app.models.Email.send({
        to: 'wanchai@vstecs.co.th',
        from: 'es.vstecs@gmail.com',
        subject: 'test',
        text: 'test',
        html: 'my <em>html</em>'
      }, function(err, mail) {
        console.log('email sent!');
        cb(err);
      });
    }
  };