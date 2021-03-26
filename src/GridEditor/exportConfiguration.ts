import { ColumnConfig } from "./types";

const exportConfiguration = (configuration: ColumnConfig[]) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(new Blob([JSON.stringify(configuration, undefined, 4)], {type: 'text/json'}));
    element.download = "export.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export default exportConfiguration;
