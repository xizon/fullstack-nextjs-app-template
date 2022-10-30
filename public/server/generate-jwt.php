<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
// Create token header as a JSON string

$header = json_encode(array(
	'typ' => 'JWT', 
	'alg' => 'HS256'
));



// Create token payload as a JSON string

$payload = json_encode(array(
	'name' => 'John Doe',
	'user_id' => 123,
	'user_name' => 'admin',
	'user_password' => 'admin'
));


// Encode Header to Base64Url String
$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

// Encode Payload to Base64Url String
$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

// Create Signature Hash
$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

// Encode Signature to Base64Url String
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

// Create JWT
$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

echo $jwt; //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VyX2lkIjoxMjMsInVzZXJfbmFtZSI6ImFkbWluIiwidXNlcl9wYXNzd29yZCI6ImFkbWluIn0.gLP213Yn8njgq7qq8nqw_U-e93f70aBCipnwa0tY0g0