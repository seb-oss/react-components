import React from "react";

type ImagePickerProps = React.PropsWithChildren<{
    size: number;
    image: string;
    onReset: () => void;
    onSelect: () => void;
}>;

export const ImagePicker: React.FC<ImagePickerProps> = (props: ImagePickerProps) => {
    return (
        <div className="image-preview" style={{ width: props.size, height: props.size }}>
            <div className="preview">
                {props.image ? <img src={props.image} width="100%" /> : ImagePlaceholderIcon}
                <button type="button" className="select" onClick={props.onSelect}>
                    {props.children || "Select image"}
                </button>
                {props.image && (
                    <button type="button" className="reset" onClick={props.onReset}>
                        &#x2715;
                    </button>
                )}
            </div>
        </div>
    );
};

const ImagePlaceholderIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="60" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        />
    </svg>
);
