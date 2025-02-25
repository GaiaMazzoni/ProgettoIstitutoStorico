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


//Restituisce il menu di navigazione
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['menu'])) {
    
    $menuItemModel = new MenuItemModel((int)$_GET['menu']);
    $menuItems = $menuItemModel->getAllMenuItems();
    $subMenuItems = $menuItemModel->getSubMenuItems();

    if ($menuItems){
        echo json_encode([
            'menuItems' => $menuItems,
            'subMenuItems' => $subMenuItems
        ]);
    } else {
        echo json_encode(['error' => 'Menu non trovato']);
    }

}