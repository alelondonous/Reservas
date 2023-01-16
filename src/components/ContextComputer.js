import React, { createContext } from 'react';

const ContextComputer = createContext({
    compu: null, setCompu: ()=>{}
});

export {ContextComputer};