import GridEditor from '../GridEditor';
import useColumnConfiguration from '../GridEditor/hooks/useColumnConfiguration';
import { ColumnConfig } from '../GridEditor/types';
import NewColumnEntry from '../GridEditor/NewColumnEntry';
import useInput from '../hooks/useInput';
import exportConfiguration from '../GridEditor/exportConfiguration';
import { useEffect, useState } from 'react';
import configurationFromString from '../GridEditor/configurationFromString';
import styles from "./styles.module.scss";
import classNames from 'classnames';

const INITIAL_CONFIGURATION: ColumnConfig[] = [
    { caption: "A", width: 6 },
    { caption: "B", width: 6 },
];

const TaskTwo = () => {
    const limit = 12;
    const [columns, onSaveNewColumn, onDeleteColumn, setEntireConfiguration] =  useColumnConfiguration(INITIAL_CONFIGURATION);
    const [textAreaValue, setTextAreaValue, onTextAreaValueChange] = useInput("");
    const [errorMessage, setErrorMessage] = useState("");

    const onExport = (e: React.SyntheticEvent) => {
        e.preventDefault();
        exportConfiguration(columns);
    };

    useEffect(() => setErrorMessage(""), [textAreaValue]);

    const onImport = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newConfigurationOrError = configurationFromString(textAreaValue, limit);

        if (typeof newConfigurationOrError === "string") {
            setErrorMessage(newConfigurationOrError);
        } else {
            setEntireConfiguration(newConfigurationOrError);
            setTextAreaValue("");
        }
    };

    return (
        <div className={styles.Task}>
            <h1 className={styles.Header}>Task 2</h1>
            <GridEditor columns={columns} deleteColumn={onDeleteColumn} />

            <div className={styles.Buttons}>
                <NewColumnEntry freeWidth={limit - columns.length} onSaveNewColumn={onSaveNewColumn} />
            </div>

            <form onSubmit={onImport}>
                <p>
                    Paste or type new JSON configuration into the area below and press "Set Configuration" to apply it to the above grid.
                </p>
                <fieldset>
                    <textarea
                        rows={10}
                        cols={80}
                        placeholder="Enter JSON grid configuration here"
                        onChange={onTextAreaValueChange}
                        value={textAreaValue}
                    />
                    <div className="error">
                        <span>{errorMessage}</span>
                    </div>
                </fieldset>

                <div className={classNames(styles.Buttons, styles.Footer)}>
                    <fieldset>
                        <button onClick={onExport}>Save current configuration to file</button>
                        <button type="submit">Set Configuration</button>
                    </fieldset>
                </div>
            </form>
        </div>
    );
}

export default TaskTwo;
