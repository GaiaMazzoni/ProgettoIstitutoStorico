<?php

include_once( '../models/menuItemModel.php');
include_once( '../config/dbConfig.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
$dbHelper = new DatabaseHelper();
$menuItemModel = new MenuItemModel();

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['menu'])) {
    

    $menuData = $menuItemModel->getAllMenuItems($_GET['menu']);

    if ($menuData){
        echo json_encode($menuData);
    } else {
        echo json_encode(['error' => 'Menu non trovato']);
    }

}

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['subsOfIdMenuItem'])) {
    $subMenuItems = [];
    $menuItemId = $_GET['subsOfIdMenuItem'];

    $subMenuItems= $menuItemModel->getAllSubsOfMenuItemAndSlugs($menuItemId);

    if($subMenuItems){
        echo json_encode($subMenuItems);
    }
}