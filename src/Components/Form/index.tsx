import { Col, Typography, Row, Tabs, Button } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import FormContext, { IDataForm } from '../../formContext';
import { NodeType } from '../../types';
import ActionBar from '../ActionBar';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';

interface Props {
	item: any;
	updateNode: (key: string, data: any) => void
}

function Form({ item, updateNode }: Props) {
	const initialDataForm: IDataForm = {
		accesses: [],
		title: '',
		users: [],
	}
	const { Title } = Typography;
	const [DataForm, setDataForm] = useState<IDataForm>(initialDataForm)
	const [TabState, setTabState] = useState('item-1')

	const handleSave = useCallback(() => {
		if (!item) return alert('لطفا یک زیر شاخه انتخاب کنید')
		if (!DataForm.title.length || !DataForm.accesses.length) return alert('نام و دسترسی ها الزامی میباشد')

		updateNode(
			Math.random().toString(),
			{
				...DataForm,
				...{ parentKey: item.key }
			}
		)

		resetForm()
		alert('زیر شاخه اضافه شد')

	}, [DataForm, item])

	const resetForm = useCallback(() => {
		setDataForm(initialDataForm)
		setTabState('item-1')
	}, [])

	const updateForm = useCallback((key: string, value: any) => {
		switch (key) {
			case 'users':
				setDataForm((prev: any) => ({
					...prev, [key]: [...prev.users, {
						title: value,
						isDefault: Boolean(!prev.users.length)
					}]
				}))
				break;

			case 'usersDelete':
				const check: any = DataForm.users.filter((el: any) => el.title == value && el.isDefault)
				console.log(check);

				if (check.length && DataForm.users.length > 1) return alert(' کاربر پیش فرض را نمیتوانید حذف کنید یا تنها در صورتی میتوانید حذف کنید که یک کاربر داشته باشید و بخواهید کاربر زیر مجموعه نداشته باشید')
				setDataForm((prev: any) => ({ ...prev, users: prev.users.filter((el: any) => el.title !== value) }))
				break;

			case 'usersSetDefault':
				setDataForm((prev: any) => ({
					...prev, users: prev.users.map((el: any) => {
						return {
							title: el.title,
							isDefault: el.title === value
						}
					})
				}))
				break;
			default:
				setDataForm((prev: any) => ({ ...prev, [key]: value }))
				break;
		}
	}, [DataForm])

	return (
		<FormContext.Provider value={{
			DataForm: DataForm,
			updateForm(key, value) {
				updateForm(key, value)
			},
		}}>
			<div className='detail'>
				<div>
					{item && (
						<div style={{ marginTop: '20px' }}>
							<Title level={4}>افزودن زیر شاخه به {item.title}</Title>
						</div>
					)}
					<div>
						<Tabs activeKey={TabState} onChange={(value) => setTabState(value)}>
							<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
								<div className='form-content'>
									<BasicInformation initialValue={item?.data?.basicInformation} />
								</div>
							</Tabs.TabPane>
							<Tabs.TabPane tab="دسترسی ها" key="item-2">
								<div className='form-content'>
									<ErrorBoundry>
										<>
											<Row>
												<Col flex="1 0 100%">
													<Accesses initialValue={item?.data?.accesses} />
												</Col>
												<Col flex="1 0 100%" style={{ marginTop: '40px' }}>
													<Button type="primary" onClick={handleSave}>ذخیره</Button>
												</Col>
											</Row>
										</>
									</ErrorBoundry>
								</div>
							</Tabs.TabPane>
						</Tabs>
					</div>
				</div>
				<ActionBar actions={[]} />
			</div>
		</FormContext.Provider>
	);
}
export default memo(Form)