var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post("/", function(request, response) {

    console.log(request.body.username);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '***',
            pass: '***'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: '***',
        to: '***',
        cc: '***',
        subject: 'Email From Portfolio',
        html:
            ' Subject: ' + request.body.subject
            + '<br>'
            + ' Persons Name: ' + request.body.name
            + '<br> '
            + ' '
            + ' Persons Email: ' + request.body.email
            + '<br> '
            + ' '
            + ' Message: ' + request.body.message,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            response.render('index', { success:false });
        } else {
            console.log('Email sent: ' + info.response);
            response.render('index', { success:true });
        }
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Joe' });
});


module.exports = router;
