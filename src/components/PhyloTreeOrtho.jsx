import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { phyloTree } from '../data/TreeStructure'
import { useNavigate } from 'react-router-dom'
import * as Plot from '@observablehq/plot'

export default function PhyloTreeOrtho() {

    const svgRef = useRef()
    const navigate = useNavigate()

    {/* VERSIONS TO SHOW:
                - https://observablehq.com/@d3/tree-of-life
                - https://observablehq.com/@d3/zoomable-sunburst
                - https://observablehq.com/@d3/cluster/2
                - https://observablehq.com/@d3/tree/2
            
            */}

    useEffect(() => {
        // orthogonal cluster configuration.
        // code comes from https://observablehq.com/@d3/cluster/2.

        const width = window.innerWidth;

        // Compute the tree height; this approach will allow the height of the
        // SVG to scale according to the breadth (width) of the tree layout.
        const root = d3.hierarchy(phyloTree);
        const dx = 10;
        const dy = width / (root.height + 1);

        // Create a tree layout.
        const tree = d3.tree().nodeSize([dx, dy]);

        // Sort the tree and apply the layout.
        root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
        tree(root);

        // Compute the extent of the tree. Note that x and y are swapped here
        // because in the tree layout, x is the breadth, but when displayed, the
        // tree extends right rather than down.
        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        // Compute the adjusted height of the tree.
        const height = x1 - x0 + dx * 2;

        const svg = d3.select(svgRef.current)
            .attr("width", width + 50)
            .attr("height", height)
            .attr("viewBox", [-dy / 3, x0 - dx, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const node = svg.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll()
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.children ? d.data.name : d.parent.data.name + " " + d.data.name)
            .attr("stroke", "white")
            .attr("paint-order", "stroke")
            .attr("font-size", "11px")
            .attr("font-color", "red")
            .attr("font-weight", d => d.data.children ? "normal" : "bold")
            .on("click", click);


        // when clicked, the nodes should display more information about their
        // organism. best way would be to create a template page with basic information about it, 
        // and have the node pass info to the template page.
        function click(e, d) {
            navigate('/template', {
                state: {
                    name: d.data.name,
                    description: d.data.description,
                    image: d.data.image
                }
            })
        }
    }, [])

    return (
        <svg ref={svgRef}>

        </svg>
    )
}
