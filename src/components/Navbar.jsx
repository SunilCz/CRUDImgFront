import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../App';

const URL = process.env.REACT_APP_CRUD;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, setAuth, refresh, setRefresh } = useContext(AuthContext);
  const navigator = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobileDevice = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${URL}/api/user/auth`, {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAuth(data);
          setRefresh(false);
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [auth, refresh, setAuth, setRefresh]);

  const logOut = () => {
    localStorage.removeItem("token");
    setRefresh(true);
    navigator("/login");
  };

  const handleHomeClick = () => {
    window.location.reload();
    handleClose();
  };

  return (
    <AppBar sx={{ p: "0 5%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <h3>CRUD</h3>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isNonMobileDevice ? (
            <>
              {auth ? (
                <>
                  <Button onClick={handleHomeClick}>
                    <Link style={{ color: "#fff", textDecoration: "none" }} to={"/"}>
                      Home
                    </Link>
                  </Button>
                  <Button>
                    <Link style={{ color: "#fff", textDecoration: "none" }} to={"/create"}>
                      Create
                    </Link>
                  </Button>
                  <Button color='inherit' onClick={logOut}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link style={{ color: "#fff", textDecoration: "none" }} to={"/login"}>
                      Login
                    </Link>
                  </Button>
                  <Button>
                    <Link style={{ color: "#fff", textDecoration: "none" }} to={"/register"}>
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: "#fff" }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {auth ? (
                  [
                    <MenuItem key="home" onClick={handleHomeClick}>
                      <Link style={{ color: "#333", textDecoration: "none" }} to={"/"}>
                        Home
                      </Link>
                    </MenuItem>,
                    <MenuItem key="create">
                      <Link style={{ color: "#333", textDecoration: "none" }} to={"/create"}>
                        Create
                      </Link>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={() => { handleClose(); logOut(); }}>
                      Logout
                    </MenuItem>,
                  ]
                ) : (
                  [
                    <MenuItem key="login" onClick={handleHomeClick}>
                      <Link style={{ color: "#333", textDecoration: "none" }} to={"/login"}>
                        Login
                      </Link>
                    </MenuItem>,
                    <MenuItem key="register">
                      <Link style={{ color: "#333", textDecoration: "none" }} to={"/register"}>
                        Register
                      </Link>
                    </MenuItem>,
                  ]
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
