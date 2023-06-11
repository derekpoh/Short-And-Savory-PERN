import * as userService from "../../utilities/users-service";
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Badge, MenuItem, Menu, Divider, ListItemText, Paper, AppBar, Box, Toolbar, IconButton, InputBase } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { SetUserType, UserState } from '../../utilities/type-declaration';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(25),
    width: '550px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '55ch',
    },
  },
}));



const NavBar = ({ user, setUser }: { user:UserState|null, setUser:SetUserType }) => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [leftMenuAnchorEl, setLeftMenuAnchorEl] = useState(null);
  const isLeftMenuOpen = Boolean(leftMenuAnchorEl);


  const [count, setCount] = useState(0);

  const handleLeftMenuOpen = (event: any) => {
    setLeftMenuAnchorEl(event.currentTarget);
  }

  const handleLeftMenuClose = () => {
    setLeftMenuAnchorEl(null);
  }
  
  const handleLeftLoginMenuClose = (callback: () => void) => {
    if (callback) {
      callback();
    }
  };

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = (callback?: () => void) => {
    setAnchorEl(null);
    if (typeof callback === "function") {
      callback();
    }
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = (callback?: () => void) => {
    setMobileMoreAnchorEl(null);
    if (typeof callback === "function") {
      callback();
    }
  };
  const [loginMenuAnchorEl, setLoginMenuAnchorEl] = useState(null);
  const isLoginMenuOpen = Boolean(loginMenuAnchorEl);
  
  const handleLoginMenuOpen = (event: any) => {
    setLoginMenuAnchorEl(event.currentTarget);
  };
  
  const handleLoginMenuClose = (callback?: () => void) => {
    setLoginMenuAnchorEl(null);
    if (callback) {
      callback();
    }
  };
  
  const handleLogOut = async () => {
    handleMenuClose();
    handleMobileMenuClose();
    userService.logOut();
    setUser(null);
    navigate("/");
  };

  const handleSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  
  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) {
      return
    }
    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    setSearchInput("");
  }
  const leftMenuId = 'left-menu';
  const renderLeftMenu = (
    <Menu
      anchorEl={leftMenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={leftMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isLeftMenuOpen}
      onClose={handleLeftMenuClose}
      PaperProps={{elevation:0}}
    >
       <Paper sx={{ width: 240, maxWidth: '100%' }}>
       <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/latestrecipes"));}}>
        <ListItemText>Latest</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/mostviews"));}}>
        <ListItemText>Most Views</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/bestratings"));}}>
        <ListItemText>Best Ratings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/American"));}}>
        <ListItemText>American</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/Chinese"));}}>
        <ListItemText>Chinese</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/Indian"));}}>
        <ListItemText>Indian</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/Italian"));}}>
        <ListItemText>Italian</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/Japanese"));}}>
        <ListItemText>Japanese</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/recipes/cuisines/Korean"));}}>
        <ListItemText>Korean</ListItemText>
      </MenuItem>
      </Paper>
    </Menu>
  );


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => handleMenuClose()}
    >
      <MenuItem key="account" onClick={() => handleMenuClose(() => navigate("/users/account"))}>
        My Account
      </MenuItem>
      <Divider/>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );

  const loginMenuId = "login-menu";
  const renderLoginMenu = (
    <Menu
      anchorEl={loginMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={loginMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLoginMenuOpen}
      onClose={() => handleLoginMenuClose()}
    >
      <MenuItem
        key="login"
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>
      <MenuItem
        key="register"
        onClick={() => handleLoginMenuClose(() => navigate("/users/register"))}
      >
        Register
      </MenuItem>
    </Menu>
  );
  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={() => handleMobileMenuClose()}
    >
      { user ? ([
      <MenuItem>
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
      >
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>,
      <MenuItem key="my-account" onClick={() => handleMobileMenuClose(() => navigate("/users/account"))}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>My Account</p>
      </MenuItem>,
      <MenuItem key="logout" onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="logout"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>

      ]) : ([
      <MenuItem 
        key="login"
        onClick={() => handleMobileMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>,
      <MenuItem
        key="register"
        onClick={() => handleMobileMenuClose(() => navigate("/users/register"))}
      >
        Register
      </MenuItem>

      ])}
        </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "brown" }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
            onClick={handleLeftMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src="/Homer_Simpson.jpeg" alt="Home Page" style={{ marginTop:"5px", marginLeft:"10px", width: "75px", height: "50px", borderRadius: '50%' }}/>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
              value={searchInput}
            />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
            <>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={count} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle fontSize="large"/>
              </IconButton>
            </>
            ) : (
              <>
              <IconButton
                size="large"
                edge="end"
                aria-controls={loginMenuId}
                aria-haspopup="true"
                onClick={handleLoginMenuOpen}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              {renderLoginMenu}
            </>
          )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderLeftMenu}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default NavBar