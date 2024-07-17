const prodUrl = (myProtocol, myHostname, myPort, specifiedPort = '') => {
    if (typeof window !== 'undefined') {
        return window.location.hostname === 'localhost' ? (typeof myPort !== 'undefined' ? `${myProtocol}://${myHostname}:${myPort}` : `${myProtocol}://${myHostname}`) : typeof myPort !== 'undefined' ? (`${window.location.protocol}//${window.location.hostname}:${specifiedPort === '' ? window.location.port : specifiedPort}`) : (`${window.location.protocol}//${window.location.hostname}`);
    } else {
        return typeof myPort !== 'undefined' ? (specifiedPort === '' ? '{reqUrl}' : `{reqUrl}:${specifiedPort}`) : (specifiedPort === '' ? '{reqUrl}' : `{reqUrl}`);
    }
};

/*
+++ Warning: +++
When using `npm run export` of `npm run build` command, the request URL in the server-side components 
cannot be "http://localhost:3000/api/xxx"
*/
const config = {

	/*
	 TYPE: Site Configuration
	 ------------------------------------------
	*/
	"MENU": `https://uiux.cc/server/navigation.php`,

	/*
	 TYPE: Posts
	 ------------------------------------------
	*/
	"RECEIVE_DEMO_LIST": "https://restcountries.com/v2/all",
	"RECEIVE_DEMO_LISTDETAIL": "https://restcountries.com/v2/name/{id}",


	/*
	 TYPE: Posts Pagination
	 ------------------------------------------
	*/
	 "RECEIVE_PAGE_LIST": `https://uiux.cc/server/posts-pagination.php?page={page}`,

	/*
	 TYPE: User (The PHP files are located at `./public/server/`)
	 ------------------------------------------
	*/
	"LOGIN_REQUEST": `https://uiux.cc/server/sessions-create.php`,
	"USER_AUTHENTICATE": `https://uiux.cc/server/authenticate.php`,
	"SIGNUP_REQUEST": "",
	
	  
	/*
	 TYPE: CRUD (The PHP files are located at `./public/server/`)
	 ------------------------------------------
	*/
	"CRUD_SERVICE": `https://uiux.cc/server/curd.php`,
	"CRUD_DATA_INIT": `https://uiux.cc/server/curd-data-init.php`,
	
	/*
	 TYPE: Downlaod remote file
	 ------------------------------------------
	*/
    "DOWNLOAD_REMOTE_FILE": `http://localhost:3000/api/extract-file?sourceurl={sourceurl}`,

	/*
	 TYPE: Dynamic Routes
	 ------------------------------------------
	*/
    "DYNAMIC_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page1`,
    "DYNAMIC_ROUTE_2": `http://localhost:3000/api/dynamic-routes/page2`,

	/*
	 TYPE: Nodejs Services (fixed port:45000 - remote port)
     !!! Compatible with Docker
	 ------------------------------------------
	*/  
    // Test API
    "TEST_API": `${prodUrl('http','192.168.xxx.xxx','45000','45000')}/api/xxxxxx`,

    // generate microservices token
    "MS_GENERATE_TOKEN": `${prodUrl('http','192.168.xxx.xxx','45000','45000')}/create-token`

};


/**
 * API for Test on Localhost
 * 
 * (Please use a PHP server environment with a local port of 4000, check the file at `./backend/server-php.js`)
 */
const localConfig = {

	/*
	 TYPE: Site Configuration
	 ------------------------------------------
	*/
	"MENU": `http://localhost:3000/api/navigation`,


	/*
	 TYPE: Posts
	 ------------------------------------------
	*/
	"RECEIVE_DEMO_LIST": `http://localhost:3000/api/posts`,
	"RECEIVE_DEMO_LISTDETAIL": `http://localhost:3000/api/post-detail?id={id}`,

	/*
	 TYPE: Posts Pagination
	 ------------------------------------------
	*/
	 "RECEIVE_PAGE_LIST": `http://localhost:3000/api/pagination/page-{page}`,

	

	/*
	 TYPE: User (The PHP files are located at `./public/server/`)
	 ------------------------------------------
	*/
	"LOGIN_REQUEST": "http://localhost:4000/sessions-create.php",
	"USER_AUTHENTICATE": "http://localhost:4000/authenticate.php",
	"SIGNUP_REQUEST": "",

	  
	/*
	 TYPE: CRUD (The PHP files are located at `./public/server/`)
	 ------------------------------------------
	*/
	"CRUD_SERVICE": `http://localhost:4000/curd.php`,
	"CRUD_DATA_INIT": `http://localhost:4000/curd-data-init.php`,
	

	  
	/*
	 TYPE: Downlaod remote file
	 ------------------------------------------
	*/
    "DOWNLOAD_REMOTE_FILE": `http://localhost:3000/api/extract-file?sourceurl={sourceurl}`,

	/*
	 TYPE: Dynamic Routes
	 ------------------------------------------
	*/
    "DYNAMIC_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page1`,
    "DYNAMIC_ROUTE_2": `http://localhost:3000/api/dynamic-routes/page2`,


	/*
	 TYPE: Nodejs Services (fixed port:4001)
	 ------------------------------------------
	*/  
    // Test API
    "TEST_API": "http://localhost:4001/api/xxxxxx",

    // generate microservices token
    "MS_GENERATE_TOKEN":  "http://localhost:4001/create-token"

};


const urls = process.env.NODE_ENV === "production" 
? config 
: localConfig;


export default urls;
