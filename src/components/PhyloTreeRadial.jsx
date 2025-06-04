import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useNavigate } from 'react-router-dom'
import Slider from '@mui/material/Slider';
import { phyloTree } from '../data/TreeStructure'
import Typography from '@mui/material/Typography';
import neo4j from 'neo4j-driver'
// import { treeMaker } from '../data/treeMaker';

export default function PhyloTreeRadial() {

    const navigate = useNavigate()
    const svgRef = useRef()
    const [rotate, setRotate] = useState(0)
    const [dbTree, setDBTree] = useState([])
    const [dbPulled, setDBPulled] = useState(false)

    useEffect(() => {
        async function neo4jConnect() {
            const URI = 'bolt://localhost:7687/'
            const USER = 'neo4j'
            const PASS = 'DeleonLab' // todo: set up .env files for secrets like this.
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

        // function dummyFunc(fuckYou) {
        //     console.log(fuckYou)
        // }

        neo4jConnect()
    }, []);

    const handleRotate = (event, newValue) => {
        setRotate(newValue)
    }

    console.log("Tree from database: " + dbTree[0])
    console.log(dbTree)

    // todo: find a way to use dbTree inside this useEffect.
    useEffect(() => {
        if (dbPulled) {
            // Specify the chart’s dimensions.
            const width = window.innerWidth - 200;
            const height = width;
            const cx = width * 0.5; // adjust as needed to fit
            const cy = height * 0.5; // adjust as needed to fit
            const radius = Math.min(width, height) / 2 - 140;

            // Create a radial cluster layout. The layout’s first dimension (x)
            // is the angle, while the second (y) is the radius.
            const tree = d3.cluster()
                .size([2 * Math.PI, radius])
                .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

            // Sort the tree and apply the layout.
            const root = tree(d3.hierarchy(dbTree ? dbTree[0] : phyloTree)
                .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

            // Creates the SVG container.
            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-cx, -cy, width, height])
                .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

            // Append links.
            svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#555")
                .attr("stroke-opacity", 0.4)
                .attr("stroke-width", 1.5)
                .selectAll()
                .data(root.links())
                .join("path")
                .attr("d", d3.linkRadial()  // coordinates are POLAR, not CARTESIAN.
                    .angle(d => d.x)
                    .radius(d => d.y));

            // Append nodes.
            svg.append("g")
                .selectAll()
                .data(root.descendants())
                .join("circle")
                .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
                .attr("fill", d => d.children ? "#555" : "#999")
                .attr("r", 2.5)
                .on("click", click);

            // Append labels.
            svg.append("g")
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .selectAll()
                .data(root.descendants())
                .join("text")
                .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
                .attr("dy", "0.31em")
                .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
                .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
                .attr("paint-order", "stroke")
                .attr("stroke", "white")
                .attr("fill", "currentColor")
                .attr("font-weight", d => d.data.children ? "normal" : "bold")
                .text(d => d.data.name)
                .on("click", click);

            function click(e, d) {
                console.log(d)
                navigate('/template', {
                    state: {
                        name: d.data.name,
                        description: d.data.description,
                        image: d.data.image
                    }
                })
            }

            svg.call(d3.drag().on('drag', dragged))

            function dragged(event, d) {
                var r = {
                    x: event.x,
                    y: event.y
                }
                svg.attr("transform", "rotate(" + r.x + ")")
            }
        }

        // console.log(dbTree[0])
        // console.log(phyloTree)
    }, [dbPulled])


    return (
        <>
            <div>
                <svg ref={svgRef}></svg>
            </div>
        </>
    )
}
