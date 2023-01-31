import React, { useContext } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import { ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
  node: NodeType;
}

function Node({ node }: Props) {
  const { handleContextMenuClick } = useContext(AppContext);

  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx
        id={node.key}
        title={node.title}
      />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx handleClick={() => handleContextMenuClick('ACTION1', node)} title={'افزودن زیرشاخه'} />
        <ContextMenuItemEx handleClick={() => handleContextMenuClick('ACTION2', node)} title={'برش'} />
        <ContextMenuItemEx handleClick={() => handleContextMenuClick('ACTION3', node)} title={'چسباندن'} />
        <ContextMenuItemEx handleClick={() => handleContextMenuClick('ACTION4', node)} title={'حذف'} />
      </ContextMenuEx>

    </div>
  );
}
export default Node