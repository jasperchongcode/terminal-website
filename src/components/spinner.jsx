import React, { useState, useEffect } from 'react';

const Spinner = () => {

    const [loadingStep, setLoadingStep] = useState(0);
    const spinnerFrames = ['|', '/', '-', '\\'];

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStep((prevStep) => (prevStep + 1) % spinnerFrames.length);
        }, 200);

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);

    return (
        <>
            {spinnerFrames[loadingStep]}
        </>
    );
};

export default Spinner;
