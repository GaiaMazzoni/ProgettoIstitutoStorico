import { runQuery } from '../config/queryBuilder'; 

const getMenuById = (id) => {
    return runQuery('select', 'menu', {}, '*', 'WHERE idMenu = ?', id);
}

const updateMenu = (id, data) => {
    return runQuery('update', 'menu', data, '*', 'WHERE idMenu = ?', id);
}

const deleteMenu = (id) => {
    return runQuery('delete', 'menu', {}, '*', 'WHERE idMenu = ?', id);
}

const createMenu = (data) => {
    return runQuery('insert', 'menu', data);
}



module.exports = { getMenuById, updateMenu, deleteMenu, createMenu, getAllMenuItems };