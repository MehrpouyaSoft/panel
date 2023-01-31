import { AutoComplete, Button } from 'antd';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getUsers } from '../../transportLayer';

interface Props {
  action: Function
}
const UserAutoComplete = ({ action }: Props) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [SelectValue, setSelectValue] = useState(null)

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    })
  }, []);

  const onSearch = useCallback((searchText: string) => {
    setOptions(
      orginalOptions.current.filter(o => o.label.indexOf(searchText) > -1)
    );
  }, []);

  const onSelect = useCallback((data: string) => {
    setSelectValue(data);
  }, []);

  const add = useCallback(() => {
    action(SelectValue)
    onSelect('')
  }, [action, SelectValue]);

  return (
    <>
      <AutoComplete
        options={options}
        value={SelectValue}
        style={{ width: 200 }}
        onSelect={onSelect}
        // onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={add}>افزودن</Button>
    </>
  );
};

export default UserAutoComplete;