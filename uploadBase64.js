require('dotenv').config();

var cloudinary = require('cloudinary');
var base64Img = require('base64-img');
var async = require("async");
// Set your API information

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

let imagePath = 'images/face.jpg';

const checkImageStatus = async (name = 'base64') =>{
    let apiCall = await cloudinary.v2.api.resource(name);
    let response = await apiCall;

    if(response.info.background_removal.cloudinary_ai.status === 'complete'){
        return true;
    } else {
        return false;
    }
};

const uploadBase64 = (imagePath) => {
    base64Img.base64(imagePath, function(err, data) {
        // Upload an image and remove background
        cloudinary.v2.uploader.upload(data, 
            {   
                public_id: "base64",
                background_removal: "cloudinary_ai",
                notification_url: 'https://e8434662.ngrok.io/image'
            }, 
            function(error, result) {
                if(!error){
                    console.log(result);
                } else {
                    console.log("Error",error.code);
                    console.log("Error",error.errno);
                }
            }
        );
    });
};

// uploadBase64('images/face.jpg');
