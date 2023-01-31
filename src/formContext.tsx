import React from 'react';

export interface IDataForm {
    accesses: any
    title: string
    users: string[]
}

interface IFormContext {
    updateForm: (key: string, value: any) => void;
    DataForm: IDataForm;
}

const defaultFormContext: IFormContext = {
    DataForm: {
        accesses: [],
        title: '',
        users: [],
    },
    updateForm: () => { },
};

const FormContext = React.createContext<IFormContext>(defaultFormContext);

export default FormContext;