const cloudinary = require('cloudinary');
const auth = require('../../config/auth');

cloudinary.config({
  cloud_name: 'fairshots',
  api_key: auth.opts.CL_apikey,
  api_secret: auth.opts.CL_apisecret
});

module.exports = {
	delPhoto(URL) {
		const regexp = /((\w+)\.(jpe?g|png|gif|bmp|)$)/gi;
        regexp.lastIndex = 0;
        const publicId = regexp.exec(URL)[2];
        return new Promise((resolve, reject) => {
	        cloudinary.v2.uploader.destroy(publicId,
	        (err, res) => {
	        	if (err) return reject(err);
	        	return resolve(res);
	        });
        });
	}
}

