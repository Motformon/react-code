import React from 'react';
import styles from './style.module.scss';
import Dialog from "../../../Dialog";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
} from "@mui/material";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {setItemLS} from '../../../../utils/localStorage';
import {ColumnOrderState, Table} from "@tanstack/react-table";

type Props = {
  columnVisibilityDialog: boolean;
  setColumnVisibilityDialog: (value: boolean) => void;
  table: Table<any>;
  setColumnOrder: (columnOrderState: ColumnOrderState) => void;
  pathColumnVisibility: string | undefined;
  pathColumnOrder: string | undefined;
};

const reorder = (list: any, startIndex: any, endIndex: any): string[] => {
  const result: string[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const ColumnVisibilityDialog: React.FC<Props> = (props) => {

  const {
    columnVisibilityDialog,
    setColumnVisibilityDialog,
    table,
    setColumnOrder,
    pathColumnVisibility,
    pathColumnOrder,
  } = props;


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const ids = allColumns.map(d => d.id);

    const quotes = reorder(
      ids,
      result.source.index,
      result.destination.index
    );

    setColumnOrder(quotes);
    if(pathColumnOrder) {
      setItemLS(pathColumnOrder, JSON.stringify(quotes));
    }
  }

  const toggleAllColumnsVisibilityHandler = table.getToggleAllColumnsVisibilityHandler();
  const allColumns = table.getAllLeafColumns();

  return (
    <Dialog
      open={columnVisibilityDialog}
      setOpen={setColumnVisibilityDialog}
      title={'Выбор столбцов'}
      className={styles.ColumnVisibilityDialog}
    >
      <div className={styles.VisibilityContent}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <List
                dense
                component="div"
                role="list"
                ref={provided.innerRef}
                style={{backgroundColor: snapshot.isDraggingOver ? '#e3f2fd' : '#ffffff'}}
                {...provided.droppableProps}
              >
                <FormControlLabel
                  className={styles.checkboxControl}
                  control={
                    <Checkbox
                      checked={table.getIsAllColumnsVisible()}
                      onChange={(event, checked) => {
                        toggleAllColumnsVisibilityHandler(event);
                        if (pathColumnVisibility) {
                          const resultData = allColumns.reduce((a, v) => ({ ...a, [v.id]: checked}), {});
                          setItemLS(pathColumnVisibility, JSON.stringify(resultData));
                        }
                      }}
                      color="primary"
                    />
                  }
                  style={{
                    paddingLeft: '8px',
                    paddingRight: '8px',
                  }}
                  label={'Выбрать все'}
                />
                {
                  allColumns.map((column, index) => {
                      const value = column.id;
                      const labelId = `transfer-list-item-${value}-label`;

                      const toggleVisibilityHandler = column.getToggleVisibilityHandler();

                      return column.id === 'expanded' ? null : (
                        <Draggable draggableId={value} index={index} key={labelId}>
                          {(provided, snapshot) => (
                            <FormControlLabel
                              className={styles.checkboxControl}
                              control={
                                <Checkbox
                                  checked={column.getIsVisible()}
                                  onChange={(event, checked) => {
                                    toggleVisibilityHandler(event);
                                    if (pathColumnVisibility) {
                                      const resultData = allColumns.reduce((a, v) => ({ ...a, [v.id]: value === v.id ? checked : v.getIsVisible()}), {});
                                      setItemLS(pathColumnVisibility, JSON.stringify(resultData));
                                    }
                                  }}
                                  color="primary"
                                />
                              }
                              label={
                                <>
                                  <span className={styles.itemTitle}>{column.columnDef.header as any}</span>
                                  <IconButton className={styles.dragBtn} size={'small'} {...provided.dragHandleProps}>
                                    <DragIndicatorIcon/>
                                  </IconButton>
                                </>
                              }
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                backgroundColor: snapshot.isDragging ? '#e8f5e9' : 'transparent',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                ...provided.draggableProps.style
                              }}
                            />
                          )}
                        </Draggable>
                      )
                    }
                  )
                }
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Dialog>
  );
};

export default ColumnVisibilityDialog;
