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

header('Content-Type: application/json');

//Per raccogliere le informazioni di una pagina a partire dal suo slug. 
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['slug'])) {
    

    $slug = str_replace(['"', "'"], '', $_GET['slug']);
    $pageModel = new pageModel($slug);

    if ($pageModel->getPageData()){
        echo json_encode([
            'pageData' => $pageModel->getPageData(),
            'subPages' => $pageModel->getSubPages(),
            'archiveInfo' => $pageModel->getArchivePageInfo(),
            'indexData' => $pageModel->getIndexData()
        ]);
    } else {
        echo json_encode(['error' => 'Pagina non trovata']);
    }

}

?>