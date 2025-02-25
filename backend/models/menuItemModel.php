<?php

include_once('../config/dbConfig.php');
include_once('menuItemModelInterface.php');

class MenuItemModel implements MenuItemModelInterface{
    private $db;
    private $idMenu;
    private $menuItem;
    private $menuItems;
    private $subMenuItems;

    public function __construct($id = null){
        $this->db = new DatabaseHelper();
        if($id){
            $this->idMenu = $id;
            $this->loadDataForMenu();
        }
    }

    private function loadDataForMenu() {
        if($this->idMenu){
            $this->fetchAllMenuItems();
            $this->fetchAllSubsOfMenuItemAndSlugs();
        }
    }

    /**
     * Seleziona un menuItem a partire dal suo id. 
     * @param mixed $id idMenuItem
     */
    private function fetchMenuItemById($id){
        $query = $this->db->buildQuery('select', 'menuItem', [], '*', 'WHERE idMenuItem = ?', [$id]);
        $this->menuItem = $this->db->executeQuery($query, [$id]);
    }

    /**
     * Prende tutti i menuItems a partire dall'id del menu di appartenenza.
     */
    private function fetchAllMenuItems(){
        $this->menuItems = $this->db->runQuery('select', 'menuItem', [], '*', 'WHERE Menu_idMenu = ? AND MenuItem_idMenuItem IS NULL', [(int) $this->idMenu]);

    }

    /**
     * Prende tutti gli elementi dei sottomenu, a partire dall'id del menuItem di cui sono sottoelementi. 
     * @param mixed $MenuItem_idMenuItem
     */
    private function fetchAllSubsOfMenuItemAndSlugs(){
        $this->subMenuItems = [];
        foreach($this->menuItems as $item){
            $result = $this->db->runQuery('select', 'menuItem, page', [], 'menuItem.*, page.slug', 'WHERE MenuItem_idMenuItem = ? AND page.idPage = menuItem.Page_idPage', [$item['idMenuItem']]);
            if($result) {
                $this->subMenuItems = array_merge($this->subMenuItems, $result);
            }
        }        
    }

    public function getAllMenuItems(){
        return $this->menuItems;
    }

    public function getSubMenuItems(){
        return $this->subMenuItems;
    }

}