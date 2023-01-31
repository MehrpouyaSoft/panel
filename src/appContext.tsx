import React from 'react';
import { NodeType } from './types';


interface IAppContext {
    treeData: NodeType[];
    handleContextMenuClick(action: string, node: Object): void;
}

const defaultAppContext: IAppContext = {
    treeData: [],
    handleContextMenuClick: () => []
};

const AppContext = React.createContext<IAppContext>(defaultAppContext);

export default AppContext;