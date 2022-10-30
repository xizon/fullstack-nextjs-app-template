// Authority 
import authHeader from '@/utils/auth-header.js';
import { getCookie } from '@/utils/cookies-tool.js';

export default function isAdmin() {

    //destroy cookie & localStorage
    const expiration = getCookie('SITE_DATA_LOGIN_COOKIE');
    if ( expiration == null || expiration == 0 ) {
        localStorage.removeItem('SITE_DATA_AUTH');
    }
    
    //check localStorage
	return !(JSON.stringify(authHeader()) === '{}');
}
