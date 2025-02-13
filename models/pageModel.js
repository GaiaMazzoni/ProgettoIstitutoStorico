import { runQuery } from '../config/queryBuilder.js';

const getPageBySlug = (slug, callback) => {
    return runQuery('select', 'page', {}, '*', 'WHERE slug = ?', slug, callback);
}

const updatePage = (id, data) => {
    return runQuery('update', 'page', data, '*', 'WHERE idPage = ?', id);
}

const deletePage = (id) => {
    return runQuery('delete', 'page', {}, '*', 'WHERE idPage = ?', id);
}

const createPage = (data) => {
    return runQuery('insert', 'page', data);
}

export { getPageBySlug, updatePage, deletePage, createPage };