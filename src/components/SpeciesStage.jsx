import React, { useEffect } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

export default function SpeciesStage({ data, modelSideLeft = true }) {
    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.loader.js",
        dataUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.data",
        frameworkUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.framework.js",
        codeUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.wasm"
    })

    useEffect(() => {
        if (isLoaded) {
            setTimeout(() => {
                sendMessage('Manager', 'LoadModel', 'https://digitalworlds.github.io/SkeletalGrowthDB/Models/Cebuella/USMN-337324_Taxon.json')
            }, 2500);
        }
    }, [isLoaded])
    
    // remember, this is for each STAGE of a species.
    // NOT the species itself.
    // that's handled in Template.jsx.
    return (
        <div>
            <h1>{data.name}</h1>
            {data.description ? <p>{data.description}</p> : null}
            <Unity unityProvider={unityProvider} style={{width: 800, height: 450}} />
        </div>
    )
}
