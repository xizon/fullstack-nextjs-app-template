// Authority 
import authHeader from '@/utils/data-service/auth-header';
import CoreUtils from '@/utils/CoreUtils';

/**
 * Determine whether you have administrator authorization
 * @returns {Boolean}
 */
function isAdmin() {
    
    //destroy cookie & localStorage
    const expiration = CoreUtils.return('getCookie', 'SITE_DATA_LOGIN_COOKIE');
    if ( expiration == null || expiration == 0 ) {
        localStorage.removeItem('SITE_DATA_AUTH');
    }
    
    //check localStorage
	return !(JSON.stringify(authHeader()) === '{}');
}


export default isAdmin;