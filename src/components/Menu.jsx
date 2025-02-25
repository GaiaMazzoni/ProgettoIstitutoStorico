import { useState, useEffect } from "react";
import '../stylesheets/Menu.css';
import { Dropdown, Navbar, NavDropdown, Container } from "react-bootstrap";
import { fetchMenuItems, fetchSubMenuItems } from "../ApiClient";

const NAVBAR_MENU_ID = 1;

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState({});

  useEffect(() => {
    fetchMenuItems(NAVBAR_MENU_ID)
      .then(setMenuItems)
      .catch(error => console.error("Errore nel caricamento del menu di navigazione", error));
  }, []); 

  useEffect(() => {
    const loadSubMenuItems = async () => {
      if (menuItems.length === 0) return;

      try{
        const responses = await Promise.all(
          menuItems.map(menuItem => 
            fetchSubMenuItems(menuItem.idMenuItem).then(data => [menuItem.idMenuItem, data])
          )
        );
        const subMenuData = Object.fromEntries(responses);
        setSubMenuItems(subMenuData);
      } catch(error){
        console.error("Errore nel caricamento del sottomenu di navigazione", error);
      }
    };

    loadSubMenuItems();
  }, [menuItems]);

  return (
    <section className="menu-section">
      <Navbar expand="md">
        <Container >
          <Navbar.Toggle aria-controls="navbar-menu" />
          <Navbar.Collapse id="navbar-menu">
            {menuItems.map((item) => ( 
              <NavDropdown key={item.idMenuItem} title={item.menuItemName} className="navbarButton">
                {subMenuItems[item.idMenuItem]?.map((subItem) => (
                    <NavDropdown.Item className="dropdown-item" key={subItem.idMenuItem} href={`${subItem.slug}`}>
                      {subItem.menuItemName}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ))}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
}