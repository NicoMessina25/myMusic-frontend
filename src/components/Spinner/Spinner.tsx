import React, { useState } from 'react'

import ClipLoader from "react-spinners/ClipLoader";

export interface SpinnerProps {
    size?: number
    className?:string
}

export default function Spinner({size=150,className=""}:SpinnerProps) {

    return (
         <ClipLoader
            color={"ffffff"}
            loading={true}
            size={size}
            className={className}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}
