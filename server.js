const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

// Receive image 
app.post('/image', function(req, res) {
    // Image 
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 200});
    res.end();
});