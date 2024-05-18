import { Card, List, ListItem } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';


const Others = () => {
    return (
        <div className='hidden md:flex'>
            <Card className="w-full">
                <List>
                    <Link to='about'><ListItem >О нас</ListItem></Link>
                    <Link to='pay-n-delivery'><ListItem>Оплата и доставка</ListItem></Link>
                    <Link to='wholesellers'><ListItem>ОПТ</ListItem></Link>
                    <Link to='contacts'><ListItem>Контакты</ListItem></Link>
                    <ListItem>Политика конфеденциальности</ListItem>
                    <ListItem>Публичная оферта</ListItem>
                </List>
            </Card>
        </div>
    );
};

export default Others;