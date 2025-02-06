<?php
// Allow requests from any origin (use specific origin in production for security)
header("Access-Control-Allow-Origin: http://localhost:3000"); // Your frontend URL
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db.php');
include('config.php');

// Getting JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if the required fields are provided
if (!isset($data->id) || !isset($data->name) || !isset($data->email)) {
    echo json_encode(array("status" => "error", "message" => "Missing required parameters"));
    exit();
}

$id = $data->id; // User ID
$name = $data->name; // Updated name
$email = $data->email; // Updated email
$dob = $data->dob;

// Check if the user exists
$sql = "SELECT * FROM users WHERE id = '$id'";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(array("status" => "error", "message" => "User not found"));
    exit();
}

// Prepare the SQL update query
$sqlUpdate = "UPDATE users SET name = '$name', email = '$email', dob = '$dob'";

if ($password !== null) {
    // If password is provided, update it
    $sqlUpdate .= ", password = '$password'";
}

$sqlUpdate .= " WHERE id = '$id'";

if ($conn->query($sqlUpdate) === TRUE) {
    echo json_encode(array("status" => "success", "message" => "User updated successfully"));
} else {
    echo json_encode(array("status" => "error", "message" => "Update failed"));
}

$conn->close();
?>
