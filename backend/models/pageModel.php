<?php

include_once( '../config/dbConfig.php');

class pageModel {
    private $db;

    public function __construct(){
        $this->db = new DatabaseHelper();
    }

    /**
     * Resitituisce i dati di una pagina, ritrovandola a partire dal suo slug. 
     * @param mixed $slug
     * @return array<array|bool|null>
     */
    public function getPageBySlug($slug){
        return $this->db->runQuery('select', 'page', [], '*', 'where slug = ?', [$slug]);
    }

    /**
     * Restituisce tutti i dati delle sottopagine (pagine contenute in altre pagine), a partire dall'id della pagina contenitore. La pagina contenitore contiene il tag che hanno anche le pagine contenute. 
     * @param mixed $idPage
     * @return array<array|bool|null>
     */
    public function getAllPagesContainedInPage($idPage){
        $idPage = (int) $idPage;
        $tags = $this->db->runQuery('select', 'page_displays_pages_of_tag', [], 'Tag_idTag', 'WHERE Page_idPage = ?', $idPage);
        $pagesContent = [];
        foreach($tags as $tag){
            $pagesContent += $this->db->runQuery('select', 'page, page_has_tag', [], 'page.*', 'WHERE page_has_tag.Tag_idTag = ? AND page.idPage = page_has_tag.Page_idPage', $tag['Tag_idTag']);
        }
        return $pagesContent;
    }

    /**
     * Prende le informazioni di archivio (cronologia, strumenti di corredo, consistenza), se all'id passato 
     * corrisponde una pagina di archivio.
     * @param mixed $idPage
     * @return array
     */
    public function getArchivePageInfo($idPage) {
        $idPage = (int) $idPage;
        $archivePageInfo = [];
        $archivePageInfo += array_merge($archivePageInfo, $this->db->runQuery('select', 'archivepage_has_inventoryitem, inventoryitem', [], 'archivepage_has_inventoryitem.*, inventoryitem.inventoryitemname', 'WHERE archivepage_has_inventoryitem.ArchivePage_Page_idPage = ? AND inventoryitem.idinventoryitem = archivepage_has_inventoryitem.inventoryitem_idinventoryitem', $idPage));
        $archivePageInfo += array_merge($archivePageInfo, $this->db->runQuery('select', 'archivePage', [], '*', 'where Page_idPage = ?', $idPage));
        $archivePageInfo += array_merge($archivePageInfo, $this->db->runQuery('select', 'archivePage_has_referencetool, referencetool', [], 'referencetool.nameReferenceTool', 'WHERE archivePage_has_referencetool.ArchivePage_Page_idPage = ? AND archivePage_has_referencetool.ReferenceTool_idReferenceTool = referencetool.idReferenceTool', $idPage));
        return $archivePageInfo;
    }

    /**
     * Restituisce un indice per la pagina dell'id passato, se provvista di uno. 
     * @param mixed $idPage
     * @return array<array|bool|null>
     */
    public function getIndexOfPage($idPage){
        $idPage = (int) $idPage;
        return $this->db->runQuery('select', 'indexItem', [], '*', 'WHERE shownInPageId = ? ', $idPage);
    }
}

?>