<?php
header("Access-Control-Allow-Methods: HEAD, GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json');

$data_file = __DIR__ . '/curd-data/posts.backup.json';
$jsondata = file_get_contents($data_file);
echo $jsondata;
die();

