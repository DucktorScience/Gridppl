import { useCallback, useState } from "react";
import { ColumnConfig } from "../types";

type ReturnType = [
    // Current column configurations
    ColumnConfig[],
    // Add new column
    (config: ColumnConfig) => void,
    // Delete column at index
    (n: number) => void,
];

function useColumnConfiguration(initialConfiguration: ColumnConfig[]): ReturnType {
    const [columns, setColumns] = useState<ColumnConfig[]>(initialConfiguration);

    const onSaveNewColumn = useCallback((newColumn: ColumnConfig) => {
        const newColumns = columns.map(original => ({...original}));

        let reclaimedSpace = 0;
        let nextIndexToReduce = 0;

        while (reclaimedSpace < newColumn.width) {
            if (newColumns[nextIndexToReduce].width > 1) {
                --newColumns[nextIndexToReduce].width;
                ++reclaimedSpace;
            }

            nextIndexToReduce = (nextIndexToReduce + 1) % newColumns.length;
        }

        setColumns([...newColumns, newColumn]);
    }, [columns]);

    const onDeleteColumn = useCallback((n: number) => {
        const newColumns = columns.map(original => ({...original}));
        const [{width}] = newColumns.splice(n, 1);

        let spaceToFill = width;
        let nextIndexToFill = 0;

        while (spaceToFill > 0) {
            ++newColumns[nextIndexToFill].width;
            --spaceToFill;
            nextIndexToFill = (nextIndexToFill + 1) % newColumns.length;
        }

        setColumns(newColumns);
    }, [columns]);

    return [
        columns,
        onSaveNewColumn,
        onDeleteColumn,
    ];
}

export default useColumnConfiguration;
