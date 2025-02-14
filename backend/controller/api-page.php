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

//Per raccogliere le informazioni di una pagina a partire dal suo slug. 
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['slug'])) {
    

    $slug = str_replace(['"', "'"], '', $_GET['slug']);
    $pageData = $pageModel->getPageBySlug($slug);

    if ($pageData){
        echo json_encode($pageData);
    } else {
        echo json_encode(['error' => 'Pagina non trovata']);
    }

}

//Per raccogliere le pagine mostrate come preview all'interno della pagina dell'id passato.
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['idPageForCollectionPage'])) {

    $idPage = $_GET['idPageForCollectionPage'];
    $subPages = $pageModel->getAllPagesContainedInPage($idPage);

    if ($subPages){
        echo json_encode($subPages);
    } else {
        echo json_encode(['error' => 'Pagina non trovata']);
    }

}

//Per informazioni dell'archivio, se la pagina e di un archivio.
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['idArchivePage'])) {

    $idPage = $_GET['idArchivePage'];
    $archivePageInfo = $pageModel->getArchivePageInfo($idPage);

    if ($archivePageInfo){
        echo json_encode($archivePageInfo);
    } else {
        echo json_encode(['error' => 'ArchivePage Inesistente']);
    }

}

//Per l'indice della pagina. 
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['idPagePerIndice'])) {

    $idPage = $_GET['idPagePerIndice'];
    $indice = $pageModel->getIndexOfPage($idPage);

    if ($indice){
        echo json_encode($indice);
    } else {
        echo json_encode(['error' => 'Indice inesistente']);
    }
}
?>