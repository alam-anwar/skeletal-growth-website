import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Template() {
    const loc = useLocation()

    return (
        <>
            {loc.state ? 
            <>
                <div><h1>{loc.state.name ? loc.state.name : "No name available."}</h1></div>
                <div>{loc.state.description ? loc.state.description : "No description available."}</div>
                <div><img style={{marginLeft: "1025px", marginTop: "-75px"}} src={loc.state.image ? loc.state.image : "./deleon-logo.png"} /></div>
            </> : <>
                <img src="./laughing-cat.gif" />
            </>}
        </>
    )
}
