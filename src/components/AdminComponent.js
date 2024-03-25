import React from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Drawer,
    IconButton,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link } from 'react-router-dom';


const AdminComponent = () => {

    const [open, setOpen] = React.useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />

                )}
            </IconButton>

            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card d className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4 text-sm font-thin text-gray-300">
                        Тут происходит волшебство! *вжух
                    </div>
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Link
                                to="monitoring"
                                onClick={() => setIsDrawerOpen(false)}
                            >Мониторинг</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Link to="create"
                                onClick={() => setIsDrawerOpen(false)}>
                                Добавить товар</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Link to="catalog"
                                onClick={() => setIsDrawerOpen(false)}
                            >Каталоги</Link>
                            <ListItemSuffix>
                                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Link
                                to="all-users"
                                onClick={() => setIsDrawerOpen(false)}
                            >Пользователи</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Link
                                to="settings"
                                onClick={() => setIsDrawerOpen(false)}
                            >Настройки</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>

                    </List>
                </Card>
            </Drawer>
        </div>
    );
};

export default AdminComponent;