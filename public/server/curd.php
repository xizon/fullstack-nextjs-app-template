<?php
header("Access-Control-Allow-Methods: HEAD, GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json');

$data_file = 'curd-data/posts.json';
$jsondata = file_get_contents($data_file);
$obj = json_decode($jsondata, true);


/**
 * Get all data
 * ------------------
 */
function get_all() {
    global $jsondata;
    echo $jsondata;
}

/**
 * Get data from ID
 * ------------------
 */
function get($id) {
    global $obj;
    $list_arr = $obj['data'];

    $res = array(
        "error" => "Unauthorized",
        "code" => 401,
    );

    foreach ($list_arr as $key => $value) {
        if ($value['id'] == $id) {
            $con = $value;
            $res = array(
                "code" => 200,
                "message" => "OK",
                "data" => $con,
            );
        }
    }

    echo json_encode($res);
}

/**
 * Create a new data
 * ------------------
 */
function create() {

    global $obj;
    global $data_file;
    $list_arr = $obj['data'];

    /** get data via form */
    $_post_email = isset( $_POST[ 'email' ] ) ? $_POST[ 'email' ] : 'newuser@gmail.com';
    $_post_name = isset( $_POST[ 'name' ] ) ? $_POST[ 'name' ] : 'newName';
    $_post_avatar = isset( $_POST[ 'avatar' ] ) ? $_POST[ 'avatar' ] : 'data:image/png;base64,
    iVBORw0KGgoAAAANSUhEUgAAAVgAAAFXAgMAAACaVL4GAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURe/s6NzVzObh2haiVxIAAAIESURBVHja7dk7boNAFIVhg0TBArwE74MlUDAIpZraq5hN0KeJFLPKyLGcwDhxCs6JjPx/XZrj0Z07L7LbAQAAAAAAAAAAAAAAAI/lFEI4JnXqWzjrxbmHcNFLU+twNShjx6/YkByDDaHVV1Zb3TLMNY4aCCdtv4iVVSEsiXqhyGKjJrbKYgdpaY/TSVrcS9jrd0sIuzbO1kUj69r+9icUMxbny7iVbQhpPvRB1Qj9Yv46VSO0v/zIykaIy0qrlm5a9kUSxWaDT5r+6rLYRhM7ZKdl1LRtm/Vb1LRtzP5uNbHNndGvuHmkrNai2HtTuGLt5vukJrbXx5a+2C5fzKbYTrLTDPrR/hi7rdGuj63ztVrLRmuIrf8ptvLFCh9R4m38r0PosWOlLz53bCF+pc+vdvoaVJ7YvfzLivaSfztjg2fGWsuOYGjb0dK2ZbD0V+1phL1nxoJlxgpPaStKeylt7ynt4Clt9JQ2bam029pr5aml8XSMnhlrLDNmuHjsLaX9bATD7d4zY6aLbeG5gdaeRqgsW7jrmWd8PTabiR0tbeuK9awGY2y/mdiS0VIEaxGmaXrfAcAmleOLI/Zg+b/A+Q5meJUVxk/tnhevobimD3aj5xtY8Hz7IPYa2z95EUbjt9t2K3tCZfyPqedJYjgdXGeZ6eQFAAAAAAAAAAAAAADAk/gAAgUhJwq2qNoAAAAASUVORK5CYII=';
    

    $_email = isset( $_GET[ 'email' ] ) ? $_GET[ 'email' ] : $_post_email;
    $_name = isset( $_GET[ 'name' ] ) ? $_GET[ 'name' ] : $_post_name;
    $_avatar = isset( $_GET[ 'avatar' ] ) ? $_GET[ 'avatar' ] : $_post_avatar;
    

    $newItem = array(
        'id' => rand(6, 9999),
        'email' => $_email,
        'name' => $_name,
        'avatar' => $_avatar,
    );

    array_unshift($list_arr, $newItem);

    $res = array(
        "code" => 200,
        "message" => "OK",
        "data" => $list_arr,
    );

    $new_content = json_encode($res);

    file_put_contents($data_file, $new_content);

    //
    echo json_encode(array(
        "code" => 200,
        "message" => "Created successfully"
    ));


}


/**
 * Update data from ID
 * ------------------
 */
function update($id) {

    global $obj;
    global $data_file;
    $list_arr = $obj['data'];

    $res = array(
        "error" => "Unauthorized",
        "code" => 401,
    );

    foreach ($list_arr as $key => $value) {
        if ($value['id'] == $id) {
         
            
            /** get data via form */
            $_post_email = isset( $_POST[ 'email' ] ) ? $_POST[ 'email' ] : 'edit@gmail.com';
            $_post_name = isset( $_POST[ 'name' ] ) ? $_POST[ 'name' ] : 'editName';
            $_post_avatar = isset( $_POST[ 'avatar' ] ) ? $_POST[ 'avatar' ] : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVgAAAFXAgMAAACaVL4GAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURe/s6NzVzObh2haiVxIAAAIESURBVHja7dk7boNAFIVhg0TBArwE74MlUDAIpZraq5hN0KeJFLPKyLGcwDhxCs6JjPx/XZrj0Z07L7LbAQAAAAAAAAAAAAAAAI/lFEI4JnXqWzjrxbmHcNFLU+twNShjx6/YkByDDaHVV1Zb3TLMNY4aCCdtv4iVVSEsiXqhyGKjJrbKYgdpaY/TSVrcS9jrd0sIuzbO1kUj69r+9icUMxbny7iVbQhpPvRB1Qj9Yv46VSO0v/zIykaIy0qrlm5a9kUSxWaDT5r+6rLYRhM7ZKdl1LRtm/Vb1LRtzP5uNbHNndGvuHmkrNai2HtTuGLt5vukJrbXx5a+2C5fzKbYTrLTDPrR/hi7rdGuj63ztVrLRmuIrf8ptvLFCh9R4m38r0PosWOlLz53bCF+pc+vdvoaVJ7YvfzLivaSfztjg2fGWsuOYGjb0dK2ZbD0V+1phL1nxoJlxgpPaStKeylt7ynt4Clt9JQ2bam029pr5aml8XSMnhlrLDNmuHjsLaX9bATD7d4zY6aLbeG5gdaeRqgsW7jrmWd8PTabiR0tbeuK9awGY2y/mdiS0VIEaxGmaXrfAcAmleOLI/Zg+b/A+Q5meJUVxk/tnhevobimD3aj5xtY8Hz7IPYa2z95EUbjt9t2K3tCZfyPqedJYjgdXGeZ6eQFAAAAAAAAAAAAAADAk/gAAgUhJwq2qNoAAAAASUVORK5CYII=';

            $_email = isset( $_GET[ 'email' ] ) ? $_GET[ 'email' ] : $_post_email;
            $_name = isset( $_GET[ 'name' ] ) ? $_GET[ 'name' ] : $_post_name;
            $_avatar = isset( $_GET[ 'avatar' ] ) ? $_GET[ 'avatar' ] : $_post_avatar;

            
            $newItem = array(
                'id' => (int)$id,
                'email' => $_email,
                'name' => $_name,
                'avatar' => $_avatar,
            );


            $list_arr[$key]['email'] = $newItem['email'];
            $list_arr[$key]['name'] = $newItem['name'];
            $list_arr[$key]['avatar'] = $newItem['avatar'];

        
            $current_data = array(
                "code" => 200,
                "message" => "OK",
                "data" => $list_arr,
            );
        
            $new_content = json_encode($current_data);

            file_put_contents($data_file, $new_content);

            //
            $res = array(
                "code" => 200,
                "message" => "Updated successfully"
            ); 
            
        }
    }

    echo json_encode($res);

}


/**
 * Remove data from ID
 * ------------------
 */
function remove($id) {

    global $obj;
    global $data_file;
    $list_arr = $obj['data'];
    $list_arr_new = array();

    $res = array(
        "error" => "Unauthorized",
        "code" => 401,
    );

    foreach ($list_arr as $key => $value) {
        if ($value['id'] != $id) {
            array_push($list_arr_new, $list_arr[$key]);
        } 
    }

    $current_data = array(
        "code" => 200,
        "message" => "OK",
        "data" => $list_arr_new,
    );

    $new_content = json_encode($current_data);

    file_put_contents($data_file, $new_content);

    //
    $res = array(
        "code" => 200,
        "message" => "Deleted successfully"
    ); 

    echo json_encode($res);

}

if (isset($_GET['type']) && $_GET['type'] != '') {
    //CURD
    $cid = (isset($_GET['id']) && $_GET['id'] != '') ? $_GET['id'] : '';

    switch ($_GET['type']) {
        case 'get':
            get($cid);
            break;
        case 'create':
            create();
            break;
        case 'update':
            update($cid);
            break;
        case 'remove':
            remove($cid);
            break;
    }
} else {
    //display all data
    get_all();
}
