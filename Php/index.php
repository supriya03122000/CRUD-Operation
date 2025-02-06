<?php
// Include necessary files
include('api/register.php');
include('api/getUser.php');

// Route POST request to registration API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    registerUser();
}

// Route GET request to fetch user details API
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getUserDetails();
}
?>
