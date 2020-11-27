import React from "react";

export interface TextboxGroupProps {
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string | number;
}

export const TextboxGroup: React.FunctionComponent<TextboxGroupProps> = (props: TextboxGroupProps) => {
    return (
        <div className="form-group">
            <input id={props.name} className="form-control" name={props.name} type={props.type} value={String(props.value)} onChange={props.onChange} />
        </div>
    );
};
