import { useEffect, useContext, useState, useMemo, useCallback } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import ActionsModel from "./model/actionData";
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

function App() {
  const { handleAction } = ActionsModel
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [CopyData, setCopyData] = useState(null);

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  }

  useEffect(() => {
    fetchTreeData()
  }, [])

  const handleContextMenuClick = useCallback((actionKey: any, node?: any) => {
    switch (actionKey) {
      case 'ACTION1':
        setSelectedItem(node);
        break;
      case 'ACTION2':
        if (!node.parentKey) return alert('این کاربر غیر قابل کپی میباشد')
        setCopyData(node)
        break;
      case 'ACTION3':
        if (CopyData.key === node.key) return alert('کاربر نمیتواند زیر مجموعه خودش باشد !')
        if (CopyData.parentKey === node.key) return alert('این زیر مجموعه برای این شاخه تکراری میباشد')
        let copyDataMaking = CopyData
        copyDataMaking['hierarchy'] = node.hierarchy
        copyDataMaking['parentKey'] = node.key


        const newData = handleAction({
          el: treeData,
          newNode: copyDataMaking,
          action: 'paste'
        })
        setTreeData(newData)
        break;
      case 'ACTION4':
        if (node.children.length) return alert('این کاربر دارای زیر شاخه میباشد')
        const data = handleAction({
          el: treeData,
          newNode: node,
          action: 'delete'
        });
        setTreeData(data)
        break;
      default:
        console.log('No Action');

    }
  }, [treeData, CopyData])

  const handleUpdateTree = useCallback((nodes: NodeType[]) => { }, [])

  const handleUpdateNode = useCallback((key: string, data: any) => {
    const newNode = {
      ...{ key: key },
      ...{ children: [] },
      ...data
    }

    setTreeData(handleAction({
      el: treeData,
      newNode: newNode,
      action: 'create'
    }))
  }, [treeData])

  return (
    <AppContext.Provider
      value={{
        treeData,
        // updateTreeData: handleUpdateTree,
        handleContextMenuClick: handleContextMenuClick
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
