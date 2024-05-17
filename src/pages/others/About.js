import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            About
            <Link to="pay-n-delivery">
            <Button> APLATTA</Button>
            </Link>
        </div>
    );
};

export default About;