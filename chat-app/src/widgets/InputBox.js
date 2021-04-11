import React from 'react';
import { TextField } from '@material-ui/core';

const InputBox = ({ label, onChange, ...restProps }) => {
    return <TextField label={label} onChange={(ev) => onChange(ev)} {...restProps} />;
};

export default InputBox;
