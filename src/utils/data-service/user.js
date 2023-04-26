import axios from 'axios';
import apiUrls from '@/config/apiUrls';

// Authority 
import CoreUtils from '@/utils/CoreUtils';


class UserService {
	constructor() {
		this.url = apiUrls.USER_AUTHENTICATE;
		this.config = {};
	}

	deveProcess(curUrl, curConfig) {
        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
		if (process.env.NODE_ENV !== "production") {
			curUrl += '?';
			curUrl += `token=${CoreUtils.return('authHeader').Authorization.replace('Bearer ', '')}`;
			curConfig = {};
		}
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */

		return {
			curUrl,
			curConfig
		};
	}
	
	
    /**
     * Get User Name
     */
	getUserName() {
		if ( !CoreUtils.return('isAdmin') ) return null;

		this.config = { 
			headers: { 
				...CoreUtils.return('authHeader'), 
				'Content-Type': 'application/json'  
			}
		};

        const { curUrl } = this.deveProcess(this.url, this.config);
        const { curConfig } = this.deveProcess(this.url, this.config);

		return axios.post(curUrl, {}, curConfig).then(function (response) {
					const jsonData = response.data;
					return jsonData.data ? jsonData.data.name : null;
				});
		
	}

	
}


export default new UserService;

