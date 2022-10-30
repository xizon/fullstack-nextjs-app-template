<?php
header("Access-Control-Allow-Methods: HEAD, GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json');


/*
if axios's property `withCredentials` is true, the php file need to use:

<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000"); // cannot be a wildcard, you have to specify the name of the domain making the request here.
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true"); // add this header
?>

*/

/** 
 * Get header Authorization
 * */
function getAuthorizationHeader(){
	$headers = null;
	if (isset($_SERVER['Authorization'])) {
		$headers = trim($_SERVER["Authorization"]);
	}
	else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
		$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
	} elseif (function_exists('apache_request_headers')) {
		$requestHeaders = apache_request_headers();
		// Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
		$requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
		//print_r($requestHeaders);
		if (isset($requestHeaders['Authorization'])) {
			$headers = trim($requestHeaders['Authorization']);
		}
	}
	return $headers;
}
/**
 * get access token from header
 * */
function getBearerToken() {
    $headers = getAuthorizationHeader();
    // HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}



// Decode the jwt token

$verify_token = false;

$token = '';


if ( isset( $_POST[ 'token' ] ) ) {
	$token = $_POST[ 'token' ];
}

if ( isset( $_GET[ 'token' ] ) ) {
	$token = $_GET[ 'token' ];
}

if ( getBearerToken() != null & !empty( getBearerToken() ) ) {
	$token = getBearerToken();
}

$res_decode = base64_decode(
				str_replace('_', '/', 
				str_replace('-','+',
				explode('.', $token)[1]
				))
			);

$res = json_decode($res_decode);


if ( empty( $res_decode ) ) {
	$verify_token = false;
} else {
	
	//echo $res_decode; // {"name":"John Doe","user_id":123,"user_name":"admin","user_password":"admin"}
	//echo $res -> name; // John Doe
	
	if ( $res -> user_name == 'admin' && $res -> user_password == 'admin' ) {
		$verify_token = true;
	} else {
		$verify_token = false;
	}

}


$RESTful_res = $verify_token ? array(
	"data" => array(
		"user_id" => $res -> user_id,
		"name" => $res -> user_name
	), 
	"message" => "OK", 
	"code" => 200
) : array(
	"error" => "Unauthorized", 
	"code" => 401
);



echo json_encode( $RESTful_res );

