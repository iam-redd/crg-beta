import React from 'react';
import { Link } from 'react-router-dom';


const Others = () => {
    return (
        <div className='flex'>
            <ul className='flex gap-5 mx-auto'>
                <li><Link to='about'>1</Link></li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </div>
    );
};

export default Others;