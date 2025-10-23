import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { phyloTree } from '../data/TreeStructure'
import { useNavigate } from 'react-router-dom'
import neo4j from 'neo4j-driver'
import { newTreeMaker } from '../data/treeMaker'
import { useSQLite } from 'react-sqlite-hook'
import { db } from '../data/connection'
// import { testDB } from '../data/statements'

export default function PhyloTreeNew() {

    document.title = 'Phylogenetic Tree - Skeletal Growth'

    const svgRef = useRef()
    const navigate = useNavigate()
    const [dbTree, setDBTree] = useState([])
    const [dbPulled, setDBPulled] = useState(false)
    const [ready, setReady] = useState(false)



    // useEffect(() => {
    //     async function neo4jConnect() {
    //         const URI = process.env.NEO4J_HOST
    //         const USER = process.env.NEO4J_USERNAME
    //         const PASS = process.env.NEO4J_PASSWORD
    //         let driver

    //         try {
    //             driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASS))
    //             const serverInfo = await driver.getServerInfo()
    //             console.log("Connection established! :)")
    //         } catch (err) {
    //             console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    //             await driver.close()
    //             return
    //         }

    //         const { records, summary } = await driver.executeQuery(
    //             `
    //                     MATCH path=(n)-[:PARENT_OF]->(o)
    //                     WITH collect(path) AS paths
    //                     CALL apoc.paths.toJsonTree(paths)
    //                     YIELD value
    //                     RETURN value
    //                     `,
    //             { database: 'neo4j' }
    //         )

    //         // setDBTree(records)

    //         let modTree = []
    //         for (let order in records) {
    //             modTree.push(treeMaker(records[order]._fields[0]))
    //         }

    //         modTree = modTree.flat(1)

    //         let temp = {
    //             name: "",
    //             children: [...modTree]
    //         }

    //         setDBTree(temp)
    //         if (dbTree) {
    //             setDBPulled(true)
    //         }

    //         await driver.close()
    //     }

    //     neo4jConnect()
    // }, []);

    useEffect(() => {
        async function SQLiteConnect() {
            // const sqlPromise = await initSqlJs({
            //     locateFile: filename => `${window.location.origin}/skeletal-growth-website/assets/sql-wasm.wasm`
            // });
            // console.log('sql.js loaded.')

            // const dataPromise = fetch("/skeletal-growth-website/assets/databases/skeletal-growth.db").then(res => res.arrayBuffer());
            // const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
            // db = new SQL.Database(new Uint8Array(buf));
            // console.log('sqlite database loaded.')

            const rows = db.exec("SELECT * FROM species;");
            const tree = newTreeMaker(rows[0].values);

            setDBTree(tree);
            if (dbTree) {
                setDBPulled(true);
            }
        }
        SQLiteConnect();
    }, []);

    useEffect(() => {
        let outerRadius = window.innerWidth / 4;
        let innerRadius = outerRadius - 170;

        const cluster = d3.cluster()
            .size([360, innerRadius])
            .separation((a, b) => 1)

        const color = d3.scaleOrdinal()
            .domain(["Primates", "Scandentia"]) // TODO: change these.
            .range(d3.schemeCategory10)

        function maxLength(d) {
            return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
        }

        function setRadius(d, y0, k) {
            d.radius = (y0 += d.data.length) * k;
            if (d.children) d.children.forEach(d => setRadius(d, y0, k));
        }

        function setColor(d) {
            var name = d.data.name;
            d.color = color.domain().indexOf(name) >= 0 ? color(name) : d.parent ? d.parent.color : null;
            if (d.children) d.children.forEach(setColor);
        }

        function linkVariable(d) {
            return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
        }

        function linkConstant(d) {
            return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
        }

        function linkExtensionVariable(d) {
            return linkStep(d.target.x, d.target.radius, d.target.x, innerRadius);
        }

        function linkExtensionConstant(d) {
            return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
        }

        function linkStep(startAngle, startRadius, endAngle, endRadius) {
            const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
            const s0 = Math.sin(startAngle);
            const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
            const s1 = Math.sin(endAngle);
            return "M" + startRadius * c0 + "," + startRadius * s0
                + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
                + "L" + endRadius * c1 + "," + endRadius * s1;
        }

        const legend = svg => {
            const g = svg
                .selectAll("g")
                .data(color.domain())
                .join("g")
                .attr("transform", (d, i) => `translate(${-outerRadius},${-outerRadius + i * 20})`);

            g.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", color);

            g.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text(d => d);
        }

        const root = d3.hierarchy(dbTree)
            .sum(d => d.branchset ? 0 : 1)
            .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length));

        cluster(root);
        setRadius(root, root.data.length = 0, innerRadius / maxLength(root));
        setColor(root);

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [-outerRadius, -outerRadius, window.innerWidth, window.innerWidth])
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);

        svg.append("g")
            .call(legend);

        svg.append("style").text(`

            .link--active {
            stroke: #000 !important;
            stroke-width: 1.5px;
            }

            .link-extension--active {
            stroke-opacity: .6;
            }

            .label--active {
            font-weight: bold;
            }

        `);

        const linkExtension = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.25)
            .selectAll("path")
            .data(root.links().filter(d => !d.target.children))
            .join("path")
            .each(function (d) { d.target.linkExtensionNode = this; })
            .attr("d", linkExtensionConstant);

        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .each(function (d) { d.target.linkNode = this; })
            .attr("d", linkConstant)
            .attr("stroke", d => d.target.color);

        svg.append("g")
            .selectAll("text")
            .data(root.leaves())
            .join("text")
            .attr("dy", ".31em")
            .attr("transform", d => `rotate(${d.x - 90}) translate(${innerRadius + 4},0)${d.x < 180 ? "" : " rotate(180)"}`)
            .attr("text-anchor", d => d.x < 180 ? "start" : "end")
            .text(d => d.data.name)
            .on("mouseover", mouseovered(true))
            .on("mouseout", mouseovered(false));

        function update(checked) {
            const t = d3.transition().duration(750);
            linkExtension.transition(t).attr("d", checked ? linkExtensionVariable : linkExtensionConstant);
            link.transition(t).attr("d", checked ? linkVariable : linkConstant);
        }

        function mouseovered(active) {
            return function (event, d) {
                d3.select(this).classed("label--active", active);
                d3.select(d.linkExtensionNode).classed("link-extension--active", active).raise();
                do d3.select(d.linkNode).classed("link--active", active).raise();
                while (d = d.parent);
            };
        }

        // when clicked, the nodes should display more information about their
        // organism. best way would be to create a template page with basic information about it, 
        // and have the node pass info to the template page.
        function click(e, d) {
            navigate(`/species?id=${d.data.id}`)
        }
    }, [dbPulled])

    return (
        <svg className="root-element" ref={svgRef}>

        </svg>
    )
}
