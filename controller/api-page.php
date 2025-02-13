<?php

include_once( '../config/dbConfig.php');
include_once( '../models/pageModel.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
    $dbHelper = new DatabaseHelper();
    $pageModel = new pageModel();

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['slug'])) {
    

    $slug = str_replace(['"', "'"], '', $_GET['slug']);
    $pageData = $pageModel->getPageBySlug($slug);

    if ($pageData){
        echo json_encode($pageData);
    } else {
        echo json_encode(['error' => 'Pagina non trovata']);
    }

}

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['idPageForCollectionPage'])) {

    $idPage = $_GET['idPageForCollectionPage'];
    $subPages = $pageModel->getAllPagesContainedInPage($idPage);

    if ($subPages){
        echo json_encode($subPages);
    } else {
        echo json_encode(['error' => 'Pagina non trovata']);
    }

}
?>