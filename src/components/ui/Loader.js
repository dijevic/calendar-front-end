import React from 'react'
import Loader from "react-loader-spinner";

export const Spinner = ({ height = 100, width = 100 }) => {
    return (
        <div className="spinner">
            <Loader
                type="Bars"
                color="#00BFFF"
                height={height}
                width={width}
            // timeout={20000} //3 secs
            />

            <span className="loader__span"> Loading... </span>
        </div>
    )
}
