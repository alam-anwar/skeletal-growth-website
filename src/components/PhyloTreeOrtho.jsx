import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { phyloTree } from '../data/TreeStructure'
import { useNavigate } from 'react-router-dom'
import neo4j from 'neo4j-driver'
import { treeMaker } from '../data/treeMaker'

export default function PhyloTreeOrtho() {

    const svgRef = useRef()
    const navigate = useNavigate()
    const [dbTree, setDBTree] = useState([])
    const [dbPulled, setDBPulled] = useState(false)

    useEffect(() => {
        async function neo4jConnect() {
            const URI = process.env.NEO4J_HOST
            const USER = process.env.NEO4J_USERNAME
            const PASS = process.env.NEO4J_PASSWORD
            let driver

            try {
                driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASS))
                const serverInfo = await driver.getServerInfo()
                console.log("Connection established! :)")
                console.log(serverInfo)
            } catch (err) {
                console.log(`Connection error\n${err}\nCause: ${err.cause}`)
                await driver.close()
                return
            }

            const { records, summary } = await driver.executeQuery(
                `
                        MATCH path=(n)-[:PARENT_OF]->(o)
                        WITH collect(path) AS paths
                        CALL apoc.paths.toJsonTree(paths)
                        YIELD value
                        RETURN value
                        `,
                { database: 'neo4j' }
            )

            console.log(records)
            // setDBTree(records)

            let modTree = []
            for (let order in records) {
                modTree.push(treeMaker(records[order]._fields[0]))
            }

            modTree = modTree.flat(1)
            console.log(modTree)
            setDBTree(modTree)
            if (dbTree) {
                setDBPulled(true)
            }

            await driver.close()
        }

        neo4jConnect()
    }, []);

    useEffect(() => {
        // orthogonal cluster configuration.
        // code comes from https://observablehq.com/@d3/cluster/2.

        if (dbPulled) {
            const width = window.innerWidth;

            // Compute the tree height; this approach will allow the height of the
            // SVG to scale according to the breadth (width) of the tree layout.
            const root = d3.hierarchy(dbTree ? dbTree[0] : phyloTree);
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
                .text(d => d.data.name)
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
        }
    }, [dbPulled])

    return (
        <svg ref={svgRef}>

        </svg>
    )
}
