import React from 'react';
import {Triangle} from "react-loader-spinner";

const Spinner = () => {
    return (
            <Triangle
            visible={true}
            height="36"
            width="36"
            color="#ba181b"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default Spinner;