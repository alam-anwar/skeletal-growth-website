import React from 'react'
import { Link } from 'react-router-dom'

export default function NavDesktop() {
    return (
        <>
            <div className="navbar">
                <img src="deleon-logo.png" />
                <div className="site-title">
                    <h1>Skeletal Growth</h1>
                    <p style={{fontStyle: 'italic'}}>Developmental Mechanisms and Evolutionary History</p>
                </div>
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <button className="dropbtn">Projects</button>
                    <div className="dropdown-content">
                        <Link to="/projects/tooth-jaw">Tooth and Jaw</Link> {/* KEEP */}
                        {/* <Link to="/projects/cranial-base">Cranial Base</Link>
                        <Link to="/projects/nasal-cavity">Nasal Cavity</Link>
                        <Link to="/projects/postorbital-septation">Postorbital Septation</Link>
                        <Link to="/projects/galago-limbs">Galago Limbs</Link> */}
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
                <Link to="/about">About Us</Link>
                <div className="dropdown dropdown-right">
                    <button className="dropbtn">Resources</button>
                    <div className="dropdown-content">
                        {/* <Link to="/resources/learning-modules">Learning Modules</Link> */}
                        <Link to="/resources/morpho-source-projects">MorphoSource Projects</Link>
                        <Link to="/resources/deleon-lab-resources">DeleonLab Resources</Link>
                        <Link to="/resources/publications">Pages and Publications</Link>
                    </div>
                </div>
            </div>
            <div class>

            </div>
        </>
    )
}
