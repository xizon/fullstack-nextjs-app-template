const config = {

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
    "Dynamic_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page1`,
    "Dynamic_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page2`
};


/**
 * API for Test on Localhost
 * 
 * (Please use a PHP server environment with a local port of 4000, check the file at `./backend/php-runner.js`)
 */
const localConfig = {

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
    "Dynamic_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page1`,
    "Dynamic_ROUTE_1": `http://localhost:3000/api/dynamic-routes/page2`

	
};


const urls = process.env.NODE_ENV === "production" 
? config 
: localConfig;

// node & browser
module.exports = urls;
