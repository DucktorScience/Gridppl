import React from 'react';
import useBase from '../hooks/useInput';
import { ColumnConfig } from './types';

type Props = {
    freeWidth: number;
    onSaveNewColumn: (newColumn: ColumnConfig) => void;
}

const NewColumnEntry = ({
    freeWidth,
    onSaveNewColumn,
}: Props) => {
    const [nameValue, setNameValue, onNameValueChange] = useBase("");
    const [widthValue, setWidthValue, onWidthValueChange] = useBase("");
    const widthAsNumber = Number(widthValue);
    const disableAddButton = !Number.isInteger(widthAsNumber) || widthAsNumber < 1 || (widthAsNumber > freeWidth);

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        onSaveNewColumn({
            caption: nameValue,
            width: widthAsNumber,
        });

        setNameValue("");
        setWidthValue("");
    };

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <label>
                    Caption:
                    <input
                        placeholder="Caption text"
                        onChange={onNameValueChange}
                        value={nameValue}
                    />
                </label>

                <label>
                    Width:
                    <input
                        placeholder="New column width"
                        min={1}
                        max={freeWidth}
                        type="number"
                        onChange={onWidthValueChange}
                        required
                        value={widthValue}
                    />
                </label>

                <button type="submit" disabled={disableAddButton}>Add Column</button>
            </fieldset>
        </form>
    );
}

export default NewColumnEntry;
