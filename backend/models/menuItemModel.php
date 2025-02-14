<?php

include_once('../config/dbConfig.php');

class MenuItemModel {
    private $db;

    public function __construct(){
        $this->db = new DatabaseHelper();
    }

    /**
     * Seleziona un menuItem a partire dal suo id. 
     * @param mixed $id idMenuItem
     * @return array
     */
    public function getMenuItemById($id){
        $query = $this->db->buildQuery('select', 'menuItem', [], '*', 'WHERE idMenuItem = ?', [$id]);
        return $this->db->executeQuery($query, [$id]);
    }

    /**
     * Prende tutti i menuItems a partire dall'id del menu di appartenenza.
     * @param mixed $idMenu
     * @return array<array|bool|null>
     */
    public function getAllMenuItems($idMenu){
        $idMenu = (int) $idMenu;
        return $this->db->runQuery('select', 'menuItem', [], '*', 'WHERE Menu_idMenu = ? AND MenuItem_idMenuItem IS NULL', $idMenu);

    }

    /**
     * Prende tutti gli elementi dei sottomenu, a partire dall'id del menuItem di cui sono sottoelementi. 
     * @param mixed $MenuItem_idMenuItem
     * @return array<array|bool|null>
     */
    public function getAllSubsOfMenuItemAndSlugs($MenuItem_idMenuItem){
        $MenuItem_idMenuItem = (int) $MenuItem_idMenuItem;
        return $this->db->runQuery('select', 'menuItem, page', [], 'menuItem.*, page.slug', 'WHERE MenuItem_idMenuItem = ? AND page.idPage = menuItem.Page_idPage', $MenuItem_idMenuItem);
    }

}