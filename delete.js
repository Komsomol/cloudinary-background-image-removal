require('dotenv').config();

var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

let prefixtoDelete="removal";

deleteDerived();

function deleteDerived(next_cursor) {

    try {
        var data = {
            
        };

        if(next_cursor) data.next_cursor = next_cursor;

        // This will delete all derived resources up to the cursor limit of 2000
        cloudinary.api.delete_resources_by_prefix(prefixtoDelete,function(result){

            // Just some logging to show what got deleted
            console.log("\n\n");
            console.log( new Date());
            console.log(result);

            // Wait 5 seconds to prevent exceeding your API limit
            if(result && result.next_cursor) {
                setTimeout(function() {
                    deleteDerived(result.next_cursor);
                },5000);
            }
        }, data ); // Be sure to pass in the config or say Bye Bye to all your photos

    } catch(e) {
        console.log("Failed!!!");
        console.log(e);
        console.log(e.message);
    }
}