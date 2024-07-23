import { Card, List, ListItem } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';


const Others = () => {
    return (
        <div className=''>
            <Card className="w-full hidden md:flex">
                <List>
                    <Link to='about'><ListItem >О нас</ListItem></Link>
                    <Link to='payndelivery'><ListItem>Оплата и доставка</ListItem></Link>
                    <Link to='wholesellers'><ListItem>ОПТ</ListItem></Link>
                    <Link to='contacts'><ListItem>Контакты</ListItem></Link>
                    <Link to='privacypolicy'><ListItem>Политика конфеденциальности</ListItem></Link>
                    <Link to='publicoffer'><ListItem>Публичная оферта</ListItem></Link>
                </List>
            </Card>

        </div>

    );
};

export default Others;