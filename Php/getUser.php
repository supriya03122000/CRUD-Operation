<?php
// Allow requests from any origin (use specific origin in production for security)
header("Access-Control-Allow-Origin: http://localhost:3000"); // Your frontend URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('./db.php');
include('./config.php');

function getUserDetails() {
    global $conn;

    // Query to select all users
    $sql = "SELECT * FROM users";

    // Execute the query
    $result = $conn->query($sql);

    // Check if any records are returned
    if ($result->num_rows > 0) {
        // Initialize an empty array to store user data
        $users = [];

        // Loop through each row and fetch the data
        while ($user = $result->fetch_assoc()) {
            $users[] = array(
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email'],
                "password" => $user['password'], // Optional: Avoid sending password in real apps
                "dob" => $user['dob']
            );
        }

        // Send all users data in the response
        echo json_encode(array(
            "status" => SUCCESS,
            "users" => $users // Send all users
        ));
    } else {
        echo json_encode(array("status" => ERROR, "message" => "No users found!"));
    }

    // Close the database connection
    $conn->close();
}

// Call the function to fetch user details
getUserDetails();
?>
