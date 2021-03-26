import { ColumnConfig } from './types';
import styles from "./styles.module.scss";

type Props = {
    config: ColumnConfig;
    onDelete?: () => void;
}

const Column = ({config, onDelete}: Props) => {
    const { caption, width } = config;

    return (
        <div className={styles.Cell}>
            <div className={styles.Header}>
                <span>{`Width: ${width}`}</span>
                {
                    onDelete && <span data-testid="delete-cell" className={styles.DeleteIcon} title="Delete" onClick={onDelete}>X</span>
                }
            </div>
            {caption ? <p>{caption}</p> : null}
        </div>
    );
}

export default Column;
