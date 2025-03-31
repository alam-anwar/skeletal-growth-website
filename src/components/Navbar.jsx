import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/phylo-tree">DEBUG: Phylogenetic Tree</Link></li>
                    <li><Link to="/index">Index</Link></li>
                    <li><Link to="/template">Template</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </>
    )
}
