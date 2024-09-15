import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
    Typography,
    Divider
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {isMobile && (
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: theme.spacing(1),
                        right: theme.spacing(2),
                        zIndex: theme.zIndex.drawer + 1,
                        color: theme.palette.primary.main
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={onClose}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }
                }}
            >
                <div>
                    <Typography variant="h6" sx={{ padding: 2, textAlign: 'center' }}>
                        Sidebar
                    </Typography>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/" sx={{ paddingY: 1.5 }}>
                            <ListAltIcon sx={{ marginRight: 2, color: theme.palette.primary.main }} />
                            <ListItemText primary="List Display" />
                        </ListItem>
                        <ListItem button component={Link} to="/create" sx={{ paddingY: 1.5 }}>
                            <AddAlertIcon sx={{ marginRight: 2, color: theme.palette.primary.main }} />
                            <ListItemText primary="Create Display" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default Sidebar;
