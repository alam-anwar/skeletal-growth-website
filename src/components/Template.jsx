import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import {db} from '../data/connection'
import { Unity, useUnityContext } from 'react-unity-webgl'
import SpeciesStage from './SpeciesStage'

export default function Template() {
    const [params, setParams] = useSearchParams()
    const id = params.get('id')
    const stmt = db.prepare("SELECT * FROM species WHERE id = :id;");
    const res = stmt.getAsObject({ ':id': id });

    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.loader.js",
        dataUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.data",
        frameworkUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.framework.js",
        codeUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.wasm"
    })

    function handleLoadModel() {
        sendMessage("Manager", "LoadFromHTML", "https://digitalworlds.github.io/SkeletalGrowthDB/Models/Cebuella/USMN-337324_Taxon.json")
    }

    document.title = res.name + ' - Skeletal Growth';

    const data = {
        name: "Newborn",
        description: "Test description.",
        modelURL: "https://digitalworlds.github.io/SkeletalGrowthDB/Models/Cebuella/USMN-337324_Taxon.json"
    }

    return (
        <div className="root-element">
            {/* <div>
                <h1>{res.name}</h1>
            </div>
            <div id="flex-container" style={{ display: 'flex', minHeight: '100%' }}>
                <div style={{ flex: 5 }}>
                    <div style={{ marginTop: '0px' }}>
                        <Markdown>{res.description ? res.description : "No description available."}</Markdown>
                    </div>
                    
                    <div className='unity-viewer' style={{ marginTop: '20px' }}>
                        <Unity unityProvider={unityProvider} style={{width: 800, height: 450}} />
                        <h1>{isLoaded ? "Unity is loaded." : "Unity is NOT loaded."}</h1>
                        <button onClick={handleLoadModel}>Click me to load a model!</button>
                    </div>
                </div>
                
                <div style={{ flex: 1 }}>
                    <img style={{ maxHeight: '350px', marginLeft: 'auto' }} src={res.image ? res.image : "./deleon-logo.png"} />
                </div>
            </div> */}
            <SpeciesStage data={data} />
        </div>
    )
}
