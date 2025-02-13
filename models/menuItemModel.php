<?php

include_once('../config/dbConfig.php');

class MenuItemModel {
    private $db;

    public function __construct(){
        $this->db = new DatabaseHelper();
    }

    public function getMenuItemById($id){
        $query = $this->db->buildQuery('select', 'menuItem', [], '*', 'WHERE idMenuItem = ?', [$id]);
        $this->db->executeQuery($query, [$id]);
    }

    public function getAllMenuItems($idMenu){
        $idMenu = (int) $idMenu;
        return $this->db->runQuery('select', 'menuItem', [], '*', 'WHERE Menu_idMenu = ? AND MenuItem_idMenuItem IS NULL', $idMenu);

    }

    public function getAllSubsOfMenuItemAndSlugs($MenuItem_idMenuItem){
        $MenuItem_idMenuItem = (int) $MenuItem_idMenuItem;
        return $this->db->runQuery('select', 'menuItem, page', [], 'menuItem.*, page.slug', 'WHERE MenuItem_idMenuItem = ? AND page.idPage = menuItem.Page_idPage', $MenuItem_idMenuItem);
    }




}