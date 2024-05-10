import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Logo from "../images/logo.jpg"; // Keep only one Logo import

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#1B6D90", padding: "5px 20px" }}>
      <div className="nav-logo-container">
        <img src={Logo} alt="" style={{ width: "150px", height: "auto" }} />
      </div>
      <div className="navbar-links-container" style={{ display: "flex", gap: "50px" }}>
        <a href="" style={{ fontSize: "14px",color:"#F1F3F4" }}>Home</a>
        <a href="" style={{ fontSize: "14px",color:"#F1F3F4" }}>About</a>
        <a href="" style={{ fontSize: "14px",color:"#F1F3F4" }}>Testimonials</a>
        <a href="" style={{ fontSize: "14px",color:"#F1F3F4" }}>Contact</a>
        <div style={{ marginTop: "-20px" }}>
          <button className="primary-button" style={{ fontSize: "12px", marginLeft: "auto",color:"#F1F3F4" }}>Book Now</button>
        </div>
        <a href="">
          <BsCart2 className="navbar-cart-icon" style={{ fontSize: "20px",color:"#F1F3F4" }} />
        </a>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} style={{ fontSize: "20px",color:"#F1F3F4" }} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 200 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
