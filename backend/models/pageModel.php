<?php

include_once( '../config/dbConfig.php');
include_once('pageModelInterface.php');

class pageModel implements PageModelInterface{
    private $db;
    private $slug;
    private $idPage;
    private $pageData;
    private $subPages;
    private $archivePageInfo;
    private $indexData;

    public function __construct($slug = null){
        $this->db = new DatabaseHelper();
        if($slug){
            $this->slug = $slug;
            $this->loadData();
        }
    }

    private function loadData() {
        if($this->slug){
            $this->fetchPageBySlug($this->slug);
            $this->idPage = $this->pageData[0]['idPage'];
            $this->fetchAllPagesContainedInPage($this->idPage);
            $this->fetchArchivePageInfo($this->idPage);
            $this->fetchIndexOfPage($this->idPage);
        }
    }

    /**
     * Trova i dati di una pagina, ritrovandola a partire dal suo slug. 
     * @param mixed $slug
     */
    private function fetchPageBySlug($slug){
        $this->pageData = $this->db->runQuery('select', 'page', [], '*', 'where slug = ?', [$slug]);
    }

    /**
     * Trova tutti i dati delle sottopagine (pagine contenute in altre pagine), a partire dall'id della pagina contenitore. La pagina contenitore contiene il tag che hanno anche le pagine contenute. 
     * @param mixed $idPage
     */
    private function fetchAllPagesContainedInPage($idPage){
        $idPage = (int) $idPage;
        $tags = $this->db->runQuery('select', 'page_displays_pages_of_tag', [], 'Tag_idTag', 'WHERE Page_idPage = ?', $idPage);
        $this->subPages = [];
        foreach($tags as $tag){
                $this->subPages += $this->db->runQuery('select', 'page, page_has_tag', [], 'page.*', 'WHERE page_has_tag.Tag_idTag = ? AND page.idPage = page_has_tag.Page_idPage', $tag['Tag_idTag']);
            }
        
    }

    /**
     * Prende le informazioni di archivio (cronologia, strumenti di corredo, consistenza), se all'id passato 
     * corrisponde una pagina di archivio.
     * @param mixed $idPage
     */
    private function fetchArchivePageInfo($idPage) {
        $idPage = (int) $idPage;
        $this->archivePageInfo = [];
        $this->archivePageInfo += array_merge($this->archivePageInfo, $this->db->runQuery('select', 'archivepage_has_inventoryitem, inventoryitem', [], 'archivepage_has_inventoryitem.*, inventoryitem.inventoryitemname', 'WHERE archivepage_has_inventoryitem.ArchivePage_Page_idPage = ? AND inventoryitem.idinventoryitem = archivepage_has_inventoryitem.inventoryitem_idinventoryitem', $idPage));
        $this->archivePageInfo += array_merge($this->archivePageInfo, $this->db->runQuery('select', 'archivePage', [], '*', 'where Page_idPage = ?', $idPage));
        $this->archivePageInfo += array_merge($this->archivePageInfo, $this->db->runQuery('select', 'archivePage_has_referencetool, referencetool', [], 'referencetool.nameReferenceTool', 'WHERE archivePage_has_referencetool.ArchivePage_Page_idPage = ? AND archivePage_has_referencetool.ReferenceTool_idReferenceTool = referencetool.idReferenceTool', $idPage));
    }

    /**
     * Trova l'indice della pagina, se presente.
     * @param mixed $idPage
     */
    private function fetchIndexOfPage($idPage){
        $idPage = (int) $idPage;
        $this->indexData = $this->db->runQuery('select', 'indexItem', [], '*', 'WHERE shownInPageId = ? ', $idPage);
    }

    /**
     * Getter per dati di una pagina.
     */
    public function getPageData() {
        return $this->pageData;
    }

    /**
     * Getter per sottopagine di una pagina.
     * @return array
     */
    public function getSubPages() {
        return $this->subPages;
    }
    /**
     * Getter per informazioni di archivio.
     * @return array
     */
    public function getArchivePageInfo() {
        return $this->archivePageInfo;
    }

    /**
     * Getter per indice.
     */
    public function getIndexData() {
        return $this->indexData;
    }

}

?>