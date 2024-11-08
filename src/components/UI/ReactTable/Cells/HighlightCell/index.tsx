import React from 'react';
import Highlighter from 'react-highlight-words';
import {CellContext} from "@tanstack/react-table";

type Props = {
  cell: CellContext<any, string>;
  search?: string;
}

const HighlightCell: React.FC<Props> = ({cell, search}) => {
  const value = cell?.getValue();
  const globalFilter = cell.table.getState()?.globalFilter || search || '';

  return (
    <Highlighter
      searchWords={[globalFilter || '']}
      autoEscape={true}
      textToHighlight={value || ''}
    />
  );
};

export default HighlightCell;
