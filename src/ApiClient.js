const BASE_URL = "http://localhost/ProgettoIstitutoStorico/backend/controller";

async function getRequest(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Errore nella richiesta a ${url}`, error);
        throw error;
    }
}

export async function fetchMenu(menuId){
    return getRequest("api-menuItem.php", {menu: menuId});
}

/*export async function fetchMenuItems(menuId) {
    return getRequest("api-menuItem.php", {menu: menuId});
}

export async function fetchSubMenuItems(menuItemId) {
    return getRequest("api-menuItem.php", {subsOfIdMenuItem: menuItemId});
}*/

export async function fetchPageBySlug(slug) {
    return getRequest("api-page.php", {slug});
}


