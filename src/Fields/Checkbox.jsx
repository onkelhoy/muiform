import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MuiCheckbox from '@material-ui/core/Checkbox';

// local imports
import withForm from "../HOC";
import isEqual from "../equal";

const Checkbox = ({ value, setValue, props: { name, ...rest } }) => {
	function handleChange(e) {
		setValue(e.target.checked);
	}

	return (
		<FormControl name={name} style={{ display: 'inline-block' }}>
			<FormControlLabel {...rest} onChange={handleChange} control={<MuiCheckbox checked={!!value} color="primary" />} />
		</FormControl>
	);
};

export default withForm(React.memo(Checkbox, isEqual), null);
