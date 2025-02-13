<?php

include_once( '../config/dbConfig.php');

class pageModel {
    private $db;

    public function __construct(){
        $this->db = new DatabaseHelper();
    }

    public function getPageBySlug($slug){
        return $this->db->runQuery('select', 'page', [], '*', 'where slug = ?', [$slug]);
    }

    public function getAllPagesContainedInPage($idPage){
        $idPage = (int) $idPage;
        $tags = $this->db->runQuery('select', 'page_displays_pages_of_tag', [], 'Tag_idTag', 'WHERE Page_idPage = ?', $idPage);
        $pagesContent = [];
        foreach($tags as $tag){
            $pagesContent += $this->db->runQuery('select', 'page, page_has_tag', [], 'page.*', 'WHERE page_has_tag.Tag_idTag = ? AND page.idPage = page_has_tag.Page_idPage', $tag['Tag_idTag']);
        }
        return $pagesContent;
    }
}

?>