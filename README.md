# Cloudinary AI Background Removal
Using Cloudinary AI Background Removal to remove backgrounds from images 

# Setup
- Run ```npm init```
- Go to [Cloudinary](https://cloudinary.com/) register for an account and enable the [Cloudinary AI Background Removal](https://cloudinary.com/console/addons#cloudinary_ai)
- Create ```.env``` to hold Cloudinary cloud name, api key and api secret
- Create server using ```ngrok``` and replace ```notification_url``` in ```index.js```
- Place test image in ```/images```
- Run ```node server``` and ```node index.js```

# Why a notification URL? 
When index.js executes it will first upload your image to Cloudinary. However the background image service has a time delay between getting the image on the cloud and removing the backgroud. The object ```info: { background_removal: { cloudinary_ai: [Object] } },``` will return ```{ status: 'pending' }```

When the background image removal is complete you will recieve a POST on the ```notification_url``` which will be an JSON object holding ```notification_type: 'info' ``` with ```info_status: 'complete',``` and new ```url``` and ```secure_url``` to the image with background removed.

The ```notification_url``` has to be online as the service will not hit localhost. You can use [ngrok](https://ngrok.com/) to create a tunnel to localhost node server. 

# Example JSON returns 

Submitting an image
```
{ public_id: 'remove-bg-test',
  version: 1552408150,
  signature: '9b3f32bcbd2bcd9ce075482555119b6d8f845de1',
  width: 968,
  height: 661,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2019-03-12T16:29:10Z',
  tags: [],
  bytes: 26599,
  type: 'upload',
  etag: '9ed4bb8389fa395288976291575e7867',
  placeholder: false,
  url: 'http://res.cloudinary.com/cloud-bucket-test/image/upload/v1552408150/remove-bg-test.jpg',
  secure_url: 'https://res.cloudinary.com/cloud-bucket-test/image/upload/v1552408150/remove-bg-test.jpg',
  info: { background_removal: { cloudinary_ai: [Object] } },
  original_filename: 'face' } undefined
{ status: 'pending' }
```

Getting a result back on ```notfication_url```
```
{ info_kind: 'cloudinary_ai',
  info_status: 'complete',
  public_id: 'remove-bg-test',
  uploaded_at: '2019-03-12T16:29:10Z',
  version: 1552408214,
  url: 'http://res.cloudinary.com/cloud-bucket-test/image/upload/v1552408214/remove-bg-test.jpg',
  secure_url: 'https://res.cloudinary.com/cloud-bucket-test/image/upload/v1552408214/remove-bg-test.jpg',
  etag: '9ed4bb8389fa395288976291575e7867',
  notification_type: 'info' }
```
