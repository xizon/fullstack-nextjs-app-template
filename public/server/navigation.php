<?php
header("Access-Control-Allow-Methods: HEAD, GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json');

$res = array(
    "code" => 200,
    "message" => "OK",
    "data" => array(
        array(
            'title' => 'Home',
            'icon' => false,
            'link' => '/',
        ),
        array(
            'title' => 'About',
            'icon' => false,
            'link' => '/about.html',
        ),
        array(
            'title' => 'Nested Routes',
            'icon' => false,
            'link' => '/nested-routes.html',
        ),
        array(
            'title' => 'Markdown Render',
            'icon' => false,
            'link' => '/md-render.html',
        ),
        array(
            'title' => 'Posts',
            'icon' => false,
            'link' => '/posts.html',
        ),
        array(
            'title' => 'Request Cache',
            'icon' => false,
            'link' => '/request.ajax.html',
        ),
        array(
            'title' => 'Pagination',
            'icon' => false,
            'link' => '/pagination/1.html',
        ),
        array(
            'title' => 'Sign In',
            'icon' => false,
            'link' => '/sign-in.html',
        ),
        array(
            'title' => 'Dashboard',
            'icon' => false,
            'link' => '/dashboard/index.html',
        ),
    )
);
echo json_encode($res);
