import React from 'react'
import Loader from "react-loader-spinner";

export const Spinner = () => {
    return (
        <div className="spinner">
            <Loader
                type="Bars"
                color="#00BFFF"
                height={100}
                width={100}
            // timeout={20000} //3 secs
            />

            <span className="loader__span"> Loading... </span>
        </div>
    )
}
