<?php
include_once 'table_config.php';


require __DIR__.'/classes/Database.php';
require __DIR__.'/classes/JwtHandler.php';

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->email) 
    || !isset($data->password)
    || empty(trim($data->email))
    || empty(trim($data->password))
    ):

    $fields = ['fields' => ['email','password']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $email = trim($data->email);
    $password = trim($data->password);

    // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Invalid Email Address!');
    
    // IF PASSWORD IS LESS THAN 6 THE SHOW THE ERROR
    elseif(strlen($password) < 6):
        $returnData = msg(0,422,'Your password must be at least 6 characters long!');

    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    else:
        try{
            
            $fetch_user_by_email = "SELECT * FROM $users_table WHERE `email`=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

            // IF THE USER IS FOUNDED BY EMAIL
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if($check_password):
				
					$reg_user_id = $row['id'];
					$ipaddress = get_client_ip();
					$logon = date('Y-m-d H:i:s', time());
					$insert_query = "INSERT INTO $users_login_table(`reg_user_id`,`ipaddress`,`logon`) VALUES(:reg_user_id,:ipaddress,:logon)";

					$insert_stmt = $conn->prepare($insert_query);
					// DATA BINDING
					$insert_stmt->bindValue(':reg_user_id', $reg_user_id, PDO::PARAM_STR);
					$insert_stmt->bindValue(':ipaddress', htmlspecialchars(strip_tags($ipaddress)), PDO::PARAM_STR);
					$insert_stmt->bindValue(':logon', htmlspecialchars(strip_tags($logon)), PDO::PARAM_STR);

					$insert_stmt->execute();



                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://localhost/php_auth_api/',
                        array("user_id"=> $row['id'])
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully logged in.',
                        'token' => $token
                    ];

                // IF INVALID PASSWORD
                else:
                    $returnData = msg(0,422,'Invalid Password!');
                endif;

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
            else:
                $returnData = msg(0,422,'Invalid Email Address. Please register your account!');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);