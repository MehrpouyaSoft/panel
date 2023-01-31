import React, { useEffect, useState, useContext, memo, useCallback } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';
import FormContext from '../../formContext';

interface Props {
	initialValue?: any;
}

function Accesses({ }: Props) {
	const [options, setOptions] = useState([]);
	const { updateForm, DataForm: { accesses } } = useContext(FormContext)

	const fetchAccessList = async () => {
		const result = await getAccessList();
		setOptions(result);
	}

	useEffect(() => {
		fetchAccessList()
	}, [])

	useEffect(() => {
		console.log('accesses',accesses);
	}, [accesses])


	const handleOnChange = useCallback((value: any) => {
		updateForm('accesses', value)
	}, [])

	return (
		<Checkbox.Group options={options as any} value={accesses} onChange={handleOnChange} />
	);
}
export default memo(Accesses)