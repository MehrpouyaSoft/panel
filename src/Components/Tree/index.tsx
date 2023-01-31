import { Input, Tree } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import Node from './node';
import SearchResult from './searchResult';

const { Search } = Input;


const TreeExtended = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const [SearchResultState, setSearchResultState] = useState([]);
  const { treeData } = useContext(AppContext);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handlePressEnter = () => {
    setSearchResultVisible(true)
  }

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} />
  }

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let result: any = []
    if (value.length < 3) return false
    handleLoop(value, treeData, result)
    setSearchResultState(result)
  }, [treeData]);

  const handleLoop = useCallback((keyword: any, el: any, result: any) => {
    el.map((el: any) => {
      handleLoop(keyword, el.children, result)
      if (el.title.includes(keyword)) result.push(el)
    })
  }, [])

  return (
    <div className='tree-wrap'>
      <Search style={{ marginBottom: 8 }} placeholder="جستجو" onChange={handleSearchInputChange} onPressEnter={handlePressEnter} />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />
      {searchResultVisible && <SearchResult items={SearchResultState} />}
    </div>
  );
};

export default TreeExtended;