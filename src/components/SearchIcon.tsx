import React from "react";
import { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement> & {
    sizer?: number;
}

export const SearchIcon = (props: IconSvgProps) => {
    const { sizer = 1, ...svgProps } = props;
    return (
        <svg
            width={sizer}
            height={sizer}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...svgProps}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
};