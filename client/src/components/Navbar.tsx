import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, LinkProps } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
  Fade,
  ButtonProps,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AppRegistration as RegisterIcon,
  Timeline as TimelineIcon,
  School as LearnIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logoImage from '../assets/logo.jpeg';

interface NavButtonProps extends ButtonProps {
  isActive: boolean;
  to: string;
}

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => !['isActive'].includes(prop as string),
})<NavButtonProps>(({ theme, isActive }) => ({
  color: 'inherit',
  position: 'relative',
  marginLeft: theme.spacing(2),
  '&::after': {
    content: '""',
    position: 'absolute',
    width: isActive ? '100%' : '0%',
    height: '2px',
    bottom: '0',
    left: '0',
    backgroundColor: theme.palette.secondary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
}));

const LogoImage = styled('img')({
  height: '12vh',
  width: 'auto',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

interface Props {
  window?: () => Window;
}

const Navbar = (props: Props) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: props.window ? props.window() : undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Register', path: '/register', icon: <RegisterIcon /> },
    { text: 'Timeline', path: '/timeline', icon: <TimelineIcon /> },
    { text: 'Learning Hub', path: '/learn', icon: <LearnIcon /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <LogoImage src={logoImage} alt="MVJ College of Engineering" />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
              bgcolor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            }}
          >
            <Box sx={{ mr: 2 }}>{item.icon}</Box>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const StyledNavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>((props, ref) => (
    <NavButton {...props} ref={ref} component={RouterLink} />
  ));

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <StyledAppBar 
          position="fixed"
          sx={{
            bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isScrolled ? theme.shadows[4] : 'none',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Fade in timeout={1000}>
                <Box
                  component={RouterLink}
                  to="/"
                  sx={{
                    flexGrow: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    ml: -20
                  }}
                >
                  <LogoImage src={logoImage} alt="MVJ College of Engineering" />
                </Box>
              </Fade>

              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {menuItems.map((item, index) => (
                    <Fade in timeout={1000 + index * 200} key={item.text}>
                      <StyledNavButton
                        to={item.path}
                        isActive={location.pathname === item.path}
                        startIcon={item.icon}
                      >
                        {item.text}
                      </StyledNavButton>
                    </Fade>
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </StyledAppBar>
      </Slide>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar /> {/* Spacer for fixed AppBar */}
    </>
  );
};

export default Navbar; 