import { Col, Popover, Row, Tree } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { NodeType } from '../../types';
import OrgchartIcon from '../SvgIcons/orgchart';
import classes from './style.module.scss';
import { DownOutlined } from '@ant-design/icons';

interface Props {
	items: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ items }: Props) {
	const [TreeData, setTreeData] = useState(null)

	const content = useMemo(() => {
		return (
			<div className={classes.content}>
				{TreeData && (
					<Tree
						showLine
						switcherIcon={<DownOutlined />}
						// onSelect={onSelect}
						treeData={TreeData}
						defaultExpandAll
					/>
				)}
			</div>
		)
	}, [TreeData]);

	return <div className='search-result' style={{ height: 200, overflow: 'auto' }}>
		{items.map((item, key) => (
			<Row className={classes.row} key={key}>
				<Col span={20}>{item.title}</Col>
				<Col span={4} className={classes.icon}>
					<Popover placement="topRight" content={content} trigger="click">
						<button onClick={() => setTreeData([item])}><OrgchartIcon /></button>
					</Popover>
				</Col>
			</Row>
		))
		}
	</div>
}
export default memo(SearchResult);