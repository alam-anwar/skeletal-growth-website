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
import CranialBase from './pages/CranialBase'
import DeleonLabResources from './pages/DeLeonLabResources'
import GalagoLimbs from './pages/GalagoLimbs'
import Haplorhines from './pages/Haplorhines'
import LearningModules from './pages/LearningModules'
import MorphoSourceProjects from './pages/MorphoSourceProjects'
import NasalCavity from './pages/NasalCavity'
import People from './pages/People'
import PostorbitalSeptation from './pages/PostorbitalSeptation'
import Strepsirrhines from './pages/Strepsirrhines'
import ToothJaw from './pages/ToothJaw'
import Projects from './pages/Projects'
import Taxonomy from './pages/Taxonomy'
import Resources from './pages/Resources'

function App() {
    return (
        <>
            <BrowserRouter basename="/skeletal-growth-website">
                <Title />
                <Navbar />
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/projects/tooth-jaw' element={<ToothJaw />} />
                    <Route path='/projects/cranial-base' element={<CranialBase />} />
                    <Route path='/projects/nasal-cavity' element={<NasalCavity />} />
                    <Route path='/projects/postorbital-septation' element={<PostorbitalSeptation />} />
                    <Route path='/projects/galago-limbs' element={<GalagoLimbs />} />
                    <Route path='/taxonomy' element={<Taxonomy />} />
                    <Route path='/taxonomy/haplorhines' element={<Haplorhines />} />
                    <Route path='/taxonomy/strepsirrhines' element={<Strepsirrhines />} />
                    <Route path='/taxonomy/phylogenetic-tree' element={<PhyloTreeOrtho />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/resources' element={<Resources />} />
                    <Route path='/resources/learning-modules' element={<LearningModules />} />
                    <Route path='/resources/morpho-source-projects' element={<MorphoSourceProjects />} />
                    <Route path='/resources/deleon-lab-resources' element={<DeleonLabResources />} />
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
