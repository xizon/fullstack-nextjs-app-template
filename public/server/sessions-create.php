<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$certified = false;

$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VyX2lkIjoxMjMsInVzZXJfbmFtZSI6ImFkbWluIiwidXNlcl9wYXNzd29yZCI6ImFkbWluIn0.gLP213Yn8njgq7qq8nqw_U-e93f70aBCipnwa0tY0g0';  // {"name":"John Doe","user_id":123,"user_name":"admin","user_password":"admin"}



if ( isset( $_POST[ 'user_name' ] ) && isset( $_POST[ 'user_password' ] ) ) {
	if ( $_POST[ 'user_name' ] == 'admin' && $_POST[ 'user_password' ] == 'admin' ) {
		$certified = true;

		$_SESSION['user_name'] = $_POST[ 'user_name' ];
		$_SESSION['last_access'] = time();
		
	} else {
		$certified = false;
	}
}


if ( isset( $_GET[ 'user_name' ] ) && isset( $_GET[ 'user_password' ] ) ) {
	if ( $_GET[ 'user_name' ] == 'admin' && $_GET[ 'user_password' ] == 'admin' ) {
		$certified = true;
		
		$_SESSION['user_name'] = $_GET[ 'user_name' ];
		$_SESSION['last_access'] = time();
		
	} else {
		$certified = false;
	}
}

$RESTful_res = $certified ? array(
	"data" => array(
		"token" => $token
	), 
	"message" => "OK", 
	"code" => 200
) : array(
	"error" => "Unauthorized", 
	"code" => 401
);



//10 minutes = 10*60 seconds
if( isset($_SESSION['last_access']) && (time() - $_SESSION['last_access']) > 600 ) {
	session_unset();
	
	// Destroy the currently active session.
	session_destroy();
	
	$RESTful_res = array(
		"error" => "Authentication Timeout", 
		"code" => 419
	);
	
	//header('Location: https://uiux.cc/poemkit'); 
	//exit();
}
  


echo json_encode( $RESTful_res );

