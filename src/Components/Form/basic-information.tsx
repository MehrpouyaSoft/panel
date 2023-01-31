import { Form, Input } from 'antd';
import React, { useContext, memo } from 'react';
import FormContext from '../../formContext';
import UserAutoComplete from './user-autocomplete';
import classes from './style.module.scss';

interface Props {
	initialValue?: any;
}

function BasicInformation({ }: Props) {
	const [form] = Form.useForm();
	const { updateForm, DataForm: { users, title } } = useContext(FormContext)

	return (
		<>
			<div>
				<Form form={form}>
					<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
						<Input onChange={(e: any) => updateForm('title', e.target.value)} value={title} />
					</Form.Item>
					<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
						<Input />
					</Form.Item>
					<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
						<UserAutoComplete action={(value: any) => {
							const checkExist = users.filter((el: any) => el.title === value)
							if (checkExist.length) return alert('این کاربر را قبلا ثبت کردید')
							updateForm('users', value)
						}} />
					</Form.Item>
				</Form>
			</div>
			{users && users.length ? (
				<div className={classes.table}>
					<table>
						<thead>
							<th>نام</th>
							<th>عملیات</th>
							<th>پیش فرض</th>
						</thead>
						<tbody>
							{users.map((el: any, key) => (
								<tr key={key} {...el.isDefault && { className: classes.default }}>
									<td>{el.title}</td>
									<td><button onClick={() => updateForm('usersDelete', el.title)}>حذف</button></td>
									<td><button onClick={() => updateForm('usersSetDefault', el.title)}>پیش فرض</button></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : ''}
		</>
	);
}
export default memo(BasicInformation)