import { ChangeEventHandler, Dispatch, SetStateAction, useCallback, useState } from "react";

type UseInputResult<T> = [string, Dispatch<SetStateAction<string>>, ChangeEventHandler<T>];

type HasValue = {
    value: string;
};

function useInput<T extends HTMLElement & HasValue>(initialState: string = ""): UseInputResult<T> {
    const [value, setter] = useState(initialState);

    const onChange: ChangeEventHandler<T> = useCallback(({target}) => {
        setter(target.value);
    }, []);

    return [value, setter, onChange];
};

export default useInput;
