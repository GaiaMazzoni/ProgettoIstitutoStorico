import { useState, useEffect } from "react";
import '../stylesheets/Menu.css';
import { Dropdown, Navbar, NavDropdown, Container } from "react-bootstrap";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost/progetto_tesi_react/backend/controller/api-menuItem.php?menu=1");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Errore nel caricamento del menu di navigazione");
      }
    };

    fetchMenuItems();
  }, []); 

  useEffect(() => {
    const fetchSubMenuItems = async () => {
      if (menuItems.length > 0) {
        for (let menuItem of menuItems) {
          try {
            const response = await fetch(`http://localhost/progetto_tesi_react/backend/controller/api-menuItem.php?subsOfIdMenuItem=${menuItem.idMenuItem}`);
            const data = await response.json();
            console.log({menuItem});
            setSubMenuItems(prev => ({
              ...prev,
              [menuItem.idMenuItem]: data
            }));
          } catch (error) {
            console.error("Errore nel caricamento del sottomenu di navigazione", error);
          }
        }
      }
    };
  
    fetchSubMenuItems();
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