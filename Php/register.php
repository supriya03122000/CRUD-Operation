<?php
// Allow requests from any origin (use specific origin in production for security)
header("Access-Control-Allow-Origin: http://localhost:3000"); // Your frontend URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db.php');
include('config.php');

// Getting JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the required fields are provided
if (!isset($data->name) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(array("status" => ERROR, "message" => "Missing required parameters"));
    exit();
}

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT); // Hash password
$dob = $data->dob;

// Check if the user already exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(array("status" => ERROR, "message" => USER_EXISTS));
    exit();
}

// Insert user into the database
$sql = "INSERT INTO users (name, email, password, dob) VALUES ('$name', '$email', '$password', '$dob')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => SUCCESS, "message" => REGISTRATION_SUCCESS));
} else {
    echo json_encode(array("status" => ERROR, "message" => REGISTRATION_FAILED));
}

$conn->close();
?>
