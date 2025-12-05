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

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  }

  return (
    <>
      <Unity unityProvider={unityProvider} style={{ width: 800, height: 450, pointerEvents: 'none' }} />

      <div style={{ marginTop: '30px' }}>
        <label>
          Enter URL: <input type="text" value={url} onChange={handleInputChange} />
        </label>
        <input type="button" onClick={sendUrlToUnity} value="Load Model" />
      </div>
    </>
  )
}