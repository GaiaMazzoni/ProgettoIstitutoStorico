import { runQuery } from '../config/queryBuilder.js';

export function getMenuItemById(id) {
    return runQuery('select', 'menuItem', {}, '*', 'WHERE idMenuItem = ?', id);
}

export function updateMenuItem(id, data) {
    return runQuery('update', 'menuItem', data, '*', 'WHERE idMenuItem = ?', id);
}

export function deleteMenuItem(id) {
    return runQuery('delete', 'menuItem', {}, '*', 'WHERE idMenuItem = ?', id);
}

export function createMenuItem(data) {
    return runQuery('insert', 'menuItem', data);
}

export function getAllMenuItems(idMenu, callback) {
    runQuery('select', 'menuItem', {}, '*', 'WHERE Menu_idMenu = ?', idMenu, callback);
}

