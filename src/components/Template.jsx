import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Template() {
    const loc = useLocation()

    return (
        <>
            {loc.state ?
                <>
                    <div>
                        <h1>{loc.state.name ? loc.state.name : "No name available."}</h1>
                    </div>
                    <div id="flex-container" style={{ display: 'flex', minHeight: '100%' }}>
                        <div style={{ flex: 4 }}>
                            <p style={{ marginTop: '0px'}}>{loc.state.description ? loc.state.description : "No description available."}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <img style={{ maxHeight: '350px', marginLeft: 'auto' }} src={loc.state.image ? loc.state.image : "./deleon-logo.png"} />
                        </div>
                    </div>
                </> : <>
                    <img src="laughing-cat.gif" />
                </>}
        </>
    )
}
