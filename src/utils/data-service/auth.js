import axios from 'axios';
import apiUrls from '@/config/apiUrls';
import CoreUtils from '@/utils/CoreUtils';

class AuthService {
	
    /**
     * Login
     */
	login(formData) {

		let url = apiUrls.LOGIN_REQUEST;

        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
		if (process.env.NODE_ENV !== "production") {
			url += '?';
			for (let pair of formData.entries()) {
				url += `${pair[0]}=${pair[1]}&`;
			}

			url = url.replace(/^\&|\&$/, '');
		}
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */



		return axios.post(url, formData)
				.then(function (response) {

					const jsonData = response.data;

				
					// Save user from local storage
					if ( jsonData.code === 200 ) {

						localStorage.setItem('SITE_DATA_AUTH',JSON.stringify({
							token: jsonData.data.token
						}));


                        // Expiration time for sync with BACKEND
                        // ( --> It could be used for different domain request)
                        const rememberme = true;
                        if ( rememberme == true ) {
                            CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', jsonData.data.token, '/', 14);
                        } else {
                            CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', jsonData.data.token, '/', 'Session');
                        }
                        



					}

					//Callback Data must be returned, otherwise res cannot be accepted after 
					//calling the `login(formData).then((res) =>{})` method of this function
					//------------------------------------------
					return jsonData;

				}).catch(function (error) {

					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.status);

					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);

					} else {
						// If there was a problem, we need to
						// dispatch the error condition
						console.log(error.message);
					}

				});


	}
	
	/*---
	!!! Asynchronous Version:
	
	async login(formData) {

		const httpRequest = () => {
			return new Promise( (resolve,reject) => {
				
				axios.post(apiUrls.LOGIN_REQUEST, formData)
				.then(function (response) {

					const jsonData = response.data;
					

					// Save user from local storage
					if ( jsonData.code === 200 ) {

						localStorage.setItem('SITE_DATA_AUTH',JSON.stringify({
							token: jsonData.data.token
						}));


                        // Expiration time for sync with BACKEND
                        // ( --> It could be used for different domain request)
                        const rememberme = true;
                        if ( rememberme == true ) {
                            CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', jsonData.data.token, '/', 14);
                        } else {
                            CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', jsonData.data.token, '/', 'Session');
                        }
                        
                        
						
					}
					
					resolve(response);

				}).catch(function (error) {
					
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						reject(error.response.status);

					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						reject(error.request);

					} else {
						// If there was a problem, we need to
						// dispatch the error condition
						reject(error.message);
					}
					
					
					
				});
		
			
			});
		};


		
		const getApiData = await httpRequest(); //The value here is passed from resolve()
		

		//Callback Data must be returned, otherwise res cannot be accepted after 
		//calling the `login(formData).then((res) =>{})` method of this function
		//------------------------------------------
		return getApiData.data;
		

	}
	
	
	---*/
	
	
    /**
     * Register (!!! This feature has not been implemented for demo. )
     */
	register(username, email, password) {
		return axios.post( apiUrls.SIGNUP_REQUEST, {
			username,
			email,
			password
		});
	}
	
	

    /**
     * Remove user from local storage
     */
	logout() {

		localStorage.removeItem('SITE_DATA_AUTH');
        CoreUtils.call('delCookie', 'SITE_DATA_LOGIN_COOKIE', '/');

	}

	
 
}


export default new AuthService;



