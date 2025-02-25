import { useState, useEffect } from "react";
import '../stylesheets/Menu.css';
import { Dropdown, Navbar, NavDropdown, Container } from "react-bootstrap";
import { fetchMenu } from "../ApiClient";

const NAVBAR_MENU_ID = 1;

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);

  useEffect(() => {
    fetchMenu(NAVBAR_MENU_ID)
      .then(data => {
        setMenuItems(data.menuItems || []);
        setSubMenuItems(data.subMenuItems || []);
      }

      )
      .catch(error => console.error("Errore nel caricamento del menu di navigazione", error));
  }, []); 

  return (
    <section className="menu-section">
      <Navbar expand="md">
        <Container >
          <Navbar.Toggle aria-controls="navbar-menu" />
          <Navbar.Collapse id="navbar-menu">
            {menuItems.map((item) => ( 
              <NavDropdown key={item.idMenuItem} title={item.menuItemName} className="navbarButton">
                {subMenuItems
                .filter(subItem => subItem.MenuItem_idMenuItem === item.idMenuItem)
                .map((subItem) => (
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