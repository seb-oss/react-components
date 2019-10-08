import * as React from "react";

interface StarProps {
    width: React.ReactText;
    height: React.ReactText;
    fill: string;
    title?: string;
}

export const SVGStarHollow: React.FunctionComponent<StarProps> = (props: StarProps): React.ReactElement<void> => {
    return (
        <svg
            className="custom-svg-star-hollow"
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {props.title && <title>{props.title}</title>}
            <desc>Created with Sketch.</desc>
            <defs>
                <path
                    d="M10.2979558,13.734 L15.01297,17.0184044 L13.11,11.668 C13.043,11.461 13.117,11.236 13.293,
                    11.108 L18.0202825,8 L12.199,8 C11.982,8 11.791,7.624 11.724,7.418 L9.99944966,2.00696716 L8.19,7.419 C8.123,
                    7.624 7.931,8 7.714,8 L2,8 L6.621,11.108 C6.797,11.236 6.871,11.461 6.804,11.668 L5.01010367,
                    17.0184044 L9.71195584,13.734 C9.79895584,13.67 9.90195584,13.639 10.0049558,13.639 C10.1079558,
                    13.639 10.2109558,13.67 10.2979558,13.734 Z M20,7.29835689 C19.9,7.09835689 19.7,6.99835689 19.5,
                    6.99835689 L12.6,6.99835689 L10.5,0.4 C10.4,0.1 10.2,1.77635684e-15 10,1.77635684e-15 C9.8,1.77635684e-15 9.6,
                    0.1 9.5,0.3 L7.4,6.99835689 L0.5,6.99835689 C0.3,6.99835689 0.1,7.09835689 0,7.29835689 C0,7.49835689 -1.15532584e-14,
                    7.79835689 0.2,7.89835689 L5.8,11.8 L3.7,18.3 C3.6,18.5 3.63065796,18.6579102 3.83065796,18.8579102 C3.93065796,18.9579102 4.2,19 4.4,
                    18.9 L10,14.9 L15.6,18.9 C15.7,19 16.1,19 16.2,18.9 C16.4,18.8 16.4,18.5 16.4,18.3 L14.3,11.8 L19.9,7.89835689 C20,7.79835689 20,7.49835689 20,7.29835689 Z"
                    id="path-1-unselected"
                />
            </defs>
            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g id="Icons-main-navigation/Star-unselected/Darkblue">
                    <g id="Icon" transform="translate(2.000000, 2.000000)">
                        <mask id="mask-unselected" fill="white">
                            <use xlinkHref="#path-1-unselected"/>
                        </mask>
                        <use id="Combined-Shape" className="star-fill" fill={props.fill} xlinkHref="#path-1-unselected"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const SVGStar: React.FunctionComponent<StarProps> = (props: StarProps): React.ReactElement<void> => {
    return (
        <svg
            className="custom-svg-star"
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {props.title && <title>{props.title}</title>}
            <desc>Created with Sketch.</desc>
            <defs>
                <path
                    d="M20,7.29835689 C19.9,7.09835689 19.7,6.99835689 19.5,6.99835689 L12.6,
                    6.99835689 L10.5,0.4 C10.4,0.1 10.2,0 10,0 C9.8,0 9.6,0.1 9.5,0.3 L7.4,
                    6.99835689 L0.5,6.99835689 C0.3,6.99835689 0.1,7.09835689 0,
                    7.29835689 C0,7.49835689 -1.15532584e-14,7.79835689 0.2,
                    7.89835689 L5.8,11.8 L3.7,18.3 C3.6,18.5 3.63065796,18.6579102 3.83065796,
                    18.8579102 C3.93065796,18.9579102 4.2,19 4.4,18.9 L10,14.9 L15.6,18.9 C15.7,19 16.1,19 16.2,
                    18.9 C16.4,18.8 16.4,18.5 16.4,18.3 L14.3,11.8 L19.9,7.89835689 C20,7.79835689 20,7.49835689 20,
                    7.29835689 Z"
                    id="path-selected-1"
                />
            </defs>
            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g id="Icons-main-navigation/Star-selected/Darkblue">
                    <g id="Icon" transform="translate(2.000000, 2.000000)">
                        <mask id="mask-selected" fill="white">
                            <use xlinkHref="#path-selected-1"/>
                        </mask>
                        <use id="Combined-Shape" className="star-fill" fill={props.fill} xlinkHref="#path-selected-1"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};
