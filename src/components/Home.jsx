import React from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

export default function Home() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "./uv-build/Build/uv-build.loader.js",
        dataUrl: "./uv-build/Build/uv-build.data.br",
        frameworkUrl: "./uv-build/Build/uv-build.framework.js.br",
        codeUrl: "./uv-build/Build/uv-build.wasm.br"
    })

    return (
        <>
            <div>
                <h1>Welcome!</h1>
                <p>This is the website for the Skeletal Growth team.</p>
                <p>Stay tuned as we update this website with more information!</p>
            </div>
            <div className='unity-viewer'>
                <Unity unityProvider={unityProvider} style={{width: 800, height: 450}} />
            </div>
        </>
    )
}
