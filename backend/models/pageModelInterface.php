<?php

interface PageModelInterface {
    /*public function fetchPageBySlug($slug);
    public function fetchAllPagesContainedInPage($idPage);
    public function fetchArchivePageInfo($idPage);
    public function fetchIndexOfPage($idPage);*/
    public function getPageData();
    public function getSubPages();
    public function getArchivePageInfo();
    public function getIndexData();
}

?>