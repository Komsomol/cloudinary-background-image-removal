// npm install cloudinary
var cloudinary = require('cloudinary');
require('dotenv').config()

// Set your API information
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

// Upload an image and remove background
cloudinary.v2.uploader.upload('images/face.jpg', 
    {   
        public_id: "remove-bg-test",
        background_removal: "cloudinary_ai",
        notification_url: 'https://1230ffa6.ngrok.io/image'
    }, 
    function(error, result) {
        if(!error){
            console.log(result, error);
            console.log(result.info.background_removal.cloudinary_ai);
            let path = result.url
            console.log(path)
        } else {
            console.log(error);
        }
    }
);
