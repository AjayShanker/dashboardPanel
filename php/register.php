<?php
include_once 'table_config.php';
require __DIR__ . '/classes/Database.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 404, 'Page Not Found!');

elseif (
    !isset($data->name)
    || !isset($data->email)
    || !isset($data->password)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->password))
) :

    $fields = ['fields' => ['name', 'email', 'password']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

    $name = trim($data->name);
    $email = trim($data->email);
    $password = trim($data->password);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Invalid Email Address!');

    elseif (strlen($password) < 6) :
        $returnData = msg(0, 422, 'Your password must be at least 6 characters long!');

    elseif (strlen($name) < 3) :
        $returnData = msg(0, 422, 'Your name must be at least 3 characters long!');

    else :
        try {

			$ipaddress = get_client_ip();
			$regon = date('Y-m-d H:i:s', time());
            $check_email = "SELECT `email` FROM $users_table WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) :
                $returnData = msg(0, 422, 'This E-mail already in use!');

            else :
                $insert_query = "INSERT INTO $users_table(`name`,`email`,`password`,`ipaddress`,`regon`) VALUES(:name,:email,:password,:ipaddress,:regon)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
				$insert_stmt->bindValue(':ipaddress', htmlspecialchars(strip_tags($ipaddress)), PDO::PARAM_STR);
				$insert_stmt->bindValue(':regon', htmlspecialchars(strip_tags($regon)), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'You have successfully registered.');

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);