<?php
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
	header("Content-Type: application/json; charset=UTF-8");

	date_default_timezone_set('Asia/Kolkata');
	define("DATABASE_NAME", "phpauthapidb");
	
	$users_table = 'phpauthapidb.users';
	$users_login_table = 'phpauthapidb.users_login';
	
	//Backend Data Table
	$registered_users_table = 'indusindDB.users_mdwebcast_may2023';
	$registered_users_login_table = 'indusindDB.users_login_mdwebcast_may2023';
	$content_table = 'indusindDB.content_mdwebcast_may2023';
	
	function get_client_ip() {
			$ipaddress = '';
			if (isset($_SERVER['HTTP_CLIENT_IP']))
				$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
			else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
				$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
			else if(isset($_SERVER['HTTP_X_FORWARDED']))
				$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
			else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
				$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
			else if(isset($_SERVER['HTTP_FORWARDED']))
				$ipaddress = $_SERVER['HTTP_FORWARDED'];
			else if(isset($_SERVER['REMOTE_ADDR']))
				$ipaddress = $_SERVER['REMOTE_ADDR'];
			else
				$ipaddress = 'UNKNOWN';
		return $ipaddress;
	}
?>