import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <Link to="/home">Home</Link>
                <div className="dropdown">
                    <button className="dropbtn">Projects</button>
                    <div className="dropdown-content">
                        <Link to="/projects/tooth-jaw">Tooth Jaw</Link>
                        <Link to="/projects/cranial-base">Cranial Base</Link>
                        <Link to="/projects/nasal-cavity">Nasal Cavity</Link>
                        <Link to="/projects/postorbital-septation">Postorbital Septation</Link>
                        <Link to="/projects/galago-limbs">Galago Limbs</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Taxonomy</button>
                    <div className="dropdown-content">
                        <Link to="/taxonomy/haplorhines">Haplorhines</Link>
                        <Link to="/taxonomy/strepsirrhines">Strepsirrhines</Link>
                        <Link to="/taxonomy/phylogenetic-tree">Phylogenetic Tree</Link>
                    </div>
                </div>
                <Link to="/people">People</Link>
                <div className="dropdown">
                    <button className="dropbtn">Resources</button>
                    <div className="dropdown-content">
                        <Link to="/resources/learning-modules">Learning Modules</Link>
                        <Link to="/resources/morpho-source-projects">MorphoSource Projects</Link>
                        <Link to="/resources/deleon-lab-resources">DeleonLab Resources</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
