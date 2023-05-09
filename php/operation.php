<?php
include_once("table_config.php");

require __DIR__.'/classes/Database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$returnData = [];

if(isset($postdata) && !empty($postdata))
{
  if(trim($request->action) === '')
  {
		return http_response_code(400);
  }else
  {
	$action = isset($request->action)?trim($request->action):'';
	if(isset($action) && $action == 'get_registered_users')
	{
		$fetch_users_detail = "SELECT * FROM $registered_users_table";
		$query_stmt = $conn->prepare($fetch_users_detail);
		$query_stmt->execute();
		$result = $query_stmt->fetchAll();
		$usersData = '';
		$registerUsers = array();
		foreach( $result as $row ) {
			//$data['id'] = $row['id'];
			$data['name'] = $row['name'];
			$data['email'] = $row['email'];
			$data['location_place'] = $row['location_place'];
			$data['watching'] = $row['watching'];
			$data['ipaddress'] = $row['ipaddress'];
			$data['regon'] = $row['regon'];
			$usersData .= '{id: '.$row['id'].',name: "'.$row['name'].'",email: "'.$row['email'].'",location_place: "'.$row['location_place'].'",watching: "'.$row['watching'].'",ipaddress: "'.$row['ipaddress'].'",regon: "'.$row['regon'].'" },';
			array_push($registerUsers,$data);
		}
		//$usersData = rtrim($usersData,",");
		$result = array('users'=>$usersData);
	
		echo json_encode($result, true);
	}
	
  }
}



?>