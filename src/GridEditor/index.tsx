import { useMemo } from 'react';
import Column from './Column';
import { ColumnConfig } from "./types";
import styles from "./styles.module.scss";

type Props = {
    columns: ColumnConfig[];
    deleteColumn: (index: number) => void;
}

const GridEditor = ({columns, deleteColumn}: Props) => {
    // Configure the actual css grid with the configuration we want
    const templateColumns = useMemo(() => {
        return columns
            .map(({ width }) => `${width}fr`)
            .join(" ");
    }, [columns]);

    return (
        <div
            className={styles.Grid}
            style={{
                gridTemplateColumns: templateColumns,
            }}
        >
            {
                columns.map((config, n) => (
                    <Column
                        config={config}
                        key={n}
                        onDelete={
                            columns.length === 1 ? undefined : () => deleteColumn(n)
                        }
                    />
                ))
            }
        </div>
    );
}

export default GridEditor;