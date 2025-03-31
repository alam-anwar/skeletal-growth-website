import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Unity, useUnityContext } from 'react-unity-webgl'
import Title from './components/Title'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PhyloTreeRadial from './components/PhyloTreeRadial'
import PhyloTreeOrtho from './components/PhyloTreeOrtho'
import Index from './components/Index'
import About from './components/About'
import Navbar from './components/Navbar'
import Template from './components/Template'

function App() {
    return (
        <>
            <BrowserRouter basename="/skeletal-growth-website">
                <Title />
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/phylo-tree' element={<PhyloTreeOrtho />} />
                    <Route path='/index' element={<Index />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/template' element={<Template />} />
                </Routes>
            </BrowserRouter>

            {/* VERSIONS TO SHOW:
                - https://observablehq.com/@d3/tree-of-life
                - https://observablehq.com/@d3/zoomable-sunburst
                - https://observablehq.com/@d3/cluster/2
                - https://observablehq.com/@d3/tree/2
            
            */}
        </>
    )
}

export default App
