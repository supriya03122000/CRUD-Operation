<?php
// Allow requests from a specific origin (adjust for production)
header("Access-Control-Allow-Origin: http://localhost:3000");  // Adjust frontend URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE"); // Allow DELETE method
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('./db.php');
include('./config.php');

function deleteUser($userId) {
    global $conn;

    // Check if user ID is valid
    if ($userId) {
        // Query to delete user by ID
        $sql = "DELETE FROM users WHERE id = $userId";  // Directly inserting $userId

        // Execute the query
        if ($conn->query($sql) === TRUE) {
            // Check if any rows were affected (meaning user was deleted)
            if ($conn->affected_rows > 0) {
                echo json_encode(array("status" => SUCCESS, "message" => "User deleted successfully"));
            } else {
                echo json_encode(array("status" => ERROR, "message" => "No user found with the provided ID"));
            }
        } else {
            echo json_encode(array("status" => ERROR, "message" => "Error deleting user"));
        }
    } else {
        echo json_encode(array("status" => ERROR, "message" => "No user ID provided"));
    }

    // Close the database connection
    $conn->close();
}

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the user ID from the URL query string
    $data = json_decode(file_get_contents("php://input"));
    $userId = $data->id;
    if ($userId) {
        // Call deleteUser function to delete the user
        deleteUser($userId);
    } else {
        echo json_encode(array("status" => ERROR, "message" => "No user ID provided"));
    }
} else {
    echo json_encode(array("status" => ERROR, "message" => "Invalid request method"));
}
?>
