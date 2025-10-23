import React from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import { useState } from 'react'

export default function TestDebug() {
    const [url, setUrl] = useState("")

    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.loader.js",
        dataUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.data",
        frameworkUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.framework.js",
        codeUrl: "./OsteologyViewerBuild/Build/OsteologyViewerBuild.wasm"
    })

    function sendUrlToUnity() {
        sendMessage("Manager", "LoadFromHTML", url);
    }

    function handleChange(e) {
        setUrl(e.target.value);
    }
    
    return (
        <>
            <Unity unityProvider={unityProvider} style={{width: 800, height: 450}}/>
            <form>
                <label>Enter URL:
                    <input type="text" value={url} onChange={handleChange} />
                </label>
                <input type="button" onClick={sendUrlToUnity} value="Load Model"/>
            </form>
        </>
    )
}