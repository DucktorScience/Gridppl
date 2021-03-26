import { ColumnConfig } from "./types";

function isObject(maybeObject: any): maybeObject is object {
    return (maybeObject !== null) && !Array.isArray(maybeObject) && typeof maybeObject === 'object';
}

function parseColumn(rawConfig: any): ColumnConfig | string {
    if (!isObject(rawConfig)) {
        return "Error: Encountered a non object entry in list of configurations";
    }

    const caption = (rawConfig as ColumnConfig)["caption"] || "";
    if (typeof caption !== "string") {
        return "Error: A name value is not a string";
    }

    const width = (rawConfig as ColumnConfig)["width"];
    if (typeof width !== "number") {
        return "Error: A width value is not a number";
    }

    return {
        caption,
        width,
    };
}

function configurationFromString(input: string, requiredTotalWidth: number): string | ColumnConfig[] {
    let parsedInput: any;
    const parsedColumns: ColumnConfig[] = [];

    try {
        parsedInput = JSON.parse(input);
    } catch (e) {
        return "Error: JSON parsing error";
    }

    if (!Array.isArray(parsedInput)) {
        return "Error: Provided JSON is not an array";
    }

    for (const rawColumn of parsedInput) {
        const parsedColumnOrError = parseColumn(rawColumn);
        if (typeof parsedColumnOrError === "string") {
            return parsedColumnOrError;
        }

        parsedColumns.push(parsedColumnOrError);
    }

    const totalWidthUsed: number = parsedColumns
        .reduce((previousValue, {width}) => previousValue + width, 0);
    if (totalWidthUsed !== requiredTotalWidth) {
        return `Error: Loaded columns have a total width of ${totalWidthUsed}. Expected exactly: ${requiredTotalWidth}`;
    }

    return parsedColumns;
}

export default configurationFromString;
