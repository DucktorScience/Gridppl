import GridEditor from '../GridEditor';
import useColumnConfiguration from '../GridEditor/hooks/useColumnConfiguration';
import { ColumnConfig } from '../GridEditor/types';
import NewColumnEntry from '../GridEditor/NewColumnEntry';
import styles from "./styles.module.scss";
import classNames from 'classnames';

const INITIAL_CONFIGURATION: ColumnConfig[] = [
    { caption: "A", width: 12 },
];

const TaskOne = () => {
    const limit = 12;
    const [columns, onSaveNewColumn, onDeleteColumn] =  useColumnConfiguration(INITIAL_CONFIGURATION);

    return (
        <div className={styles.Task}>
            <h1 className={styles.Header}>Task 1</h1>
            <GridEditor columns={columns} deleteColumn={onDeleteColumn} />
            <div className={classNames(styles.Buttons, styles.Footer)}>
                <NewColumnEntry freeWidth={limit - columns.length} onSaveNewColumn={onSaveNewColumn} />
            </div>
        </div>
    );
};

export default TaskOne;
