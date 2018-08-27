var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    const file = __dirname + '/../public/uploads/MyResume.pdf';
    res.download(file); // Set disposition and send it.
});

module.exports = router;