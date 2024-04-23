

/*
* Load Textures
*
* @param  {Array} arr                        - All images and videos from array. 
*                                              Such as: `[{"url":"1.jpg","type":"img"},{"url":"1.mp4","type":"video"}]`
* @param  {?Function} perLoadedCallback      - Callback function after per item is completed
* @return {Promise}
* 
* Usage: 

    const sources = [];

    //Push all images from page
    const imgs = document.getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) {
        sources.push({"url": imgs[i].src, "type": 'img'});
    }

    //Push all videos from page
    const videos = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
        const _sources = videos[i].getElementsByTagName('source');
        sources.push({ "url": _sources.length > 0 ? _sources[0].src : videos[i].src, "type": 'video'});
    }

	loadTextures(sources, function(value) {
 	   //loading
   	 console.log( 'loaded item: ', value );
	}).then( function() {
  	  console.log( 'all resources loaded!' );
	});


*/   
function loadTextures(arr, perLoadedCallback) {
    let promises = [];
    if (typeof (perLoadedCallback) === 'undefined') perLoadedCallback = function (url) { console.log(url) };

    for (let i = 0; i < arr.length; i++) {

        if (arr[i].type == 'img') {
            ///////////
            // IMAGE //
            ///////////   
            promises.push(

                new Promise(function (resolve, reject) {

                    const img = document.createElement('img');
                    img.src = arr[i].url;

                    img.onload = function (e) {
                        // compatible with safari and firefox
						const _path = typeof e.path === typeof undefined ? e.target.currentSrc : e.path[0].currentSrc;

						// send back result
						return resolve({
							height: this.height,
							width: this.width,
							source: _path
						});

                    };

                }).then(perLoadedCallback)
            );

        } else {
            ///////////
            // VIDEO //
            ///////////    
            promises.push(
                new Promise(function (resolve, reject) {

                    const video = document.createElement('video');
                    video.addEventListener("loadedmetadata", function (e) {
                        // retrieve dimensions
                        let height = this.videoHeight;
                        let width = this.videoWidth;

                        // compatible with safari and firefox
						const _path = typeof e.path === typeof undefined ? e.target.currentSrc : e.path[0].currentSrc;

						// send back result
                        return resolve({
                            height: height,
                            width: width,
                            source: _path
                        });
                    }, false);

                    // start download meta-datas
                    video.src = arr[i].url;
                }).then(perLoadedCallback)
            );



        }

    }

    return Promise.all(promises);
}


export {
    loadTextures
}