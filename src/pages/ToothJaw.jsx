import React from 'react'

export default function ToothJaw() {
    return (
        <div className='root-element'>
            <div className="toothJawIntro">
                <h1>Teeth and Jaws</h1>
                <div style={{marginLeft: "auto", marginRight: "auto", width: "90%", display: "flex", flexDirection: "row"}}>
                    <img style={{alignSelf: "center", flex: "1"}} src="toothJawMain.png" />
                    <div className="toothJawIntroText" style={{flexDirection: "column", flex: "4"}}>
                        <p style={{fontSize: "150%"}}>Biological variation in the vertebrate skull is driven to a large extent by variation in the bones of the jaw. Among primates, some primates have long snouts and some have much flatter faces. This project investigates the important role of developing teeth in directing ossification in the jaws and driving different patterns of growth.</p>
                        <p style={{fontStyle: "italic", fontSize: "110%"}}>Funded by NSF Project "Collaborative Research: Dentofacial development in primates" (BSC-__, __, and __)</p>
                    </div>
                </div>
            </div>

            <h2>Project Aims</h2>
            <ol>
                <li>Establish the osteogenic potential of the dental follicle relative to the stage of dental development during the fetal and perinatal periods in primates.</li>
                <li>Establish that the duration of cap and bell stages of primary tooth development and/or rate of proliferation of follicle osteogenic cells at those stages is correlated with the degree of rostral elongation of maxillary and mandibular alveolar bone.</li>
                <li>Test spatial relationship of tooth germs relative to key structures with respect to predictions based on functional matrix theory.</li>
                <li>Test bone cellular activity with respect to predictions based on functional matrix theory.</li>
            </ol>

            <h2>Sample</h2>
            <p>We are most interested in early growth of teeth and jaws, so we focus on the newborn stage in primates. Older juveniles and adults give us additional information about the trajectories and endpoints of growth. We combine information from conventional CT scans, iodine-stained diceCT scans, and histology to reconstruct the cellular processes and spatial relationships of developing teeth and jaws.</p>
            <table align="center" className="toothJawSamples" style={{border: "2px solid black"}}>
                <thead>
                    <tr>
                        <th>Strepsirrhines</th>
                        <th>Haplorhines</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lemur</td>
                        <td>Alouatta</td>
                    </tr>
                    <tr>
                        <td>Propithecus</td>
                        <td>Aotus</td>
                    </tr>
                    <tr>
                        <td>Varecia</td>
                        <td>Cebuella</td>
                    </tr>
                    <tr>
                        <td>{/* empty cell. */}</td>
                        <td>Papio</td>
                    </tr>
                </tbody>
            </table>

            <h2>Major Findings</h2>
            <table className="toothJawMajorFindings">
                <tr>
                    <td><img src="majorFinding1.png" /></td>
                    <td><img src="majorFinding2.png" /></td>
                </tr>
                <tr>
                    <td>At the 2025 Anatomy Connected meeting, we documented early- and late-stage osteoblasts in the membranous sacs surrounding tooth germs (Smith et al., 2025). In this mandible of <em>Alouatta seniculus</em>, Runx2+ cells are an indicator of early osteoblast differentiation, and Osterix+ cells indicate late osteoblast differentiation.</td>
                    <td>We also showed that tooth germ orientation provides a potential mechanism for jaw elongation (prognathism) in newborn primates (DeLeon et al., 2025). In strepsirrhines, expansion of parafollicular soft tissues allow tooth germs to develop in line with their eventual path of eruption. In contrast, in catarrhines, tooth germs develop at an oblique angle and must rotate through development and prior to eruption.</td>
                </tr>
            </table>

            <h2>Publications</h2>
            <ul>
                <li>DeLeon, V.B., Bento Da Costa, L., Franklin, K.P., Sides, S.H., Prufrock, K.A., & Smith, T.D., Tooth germ orientation overcomes spatial constraints in growth of prognathic jaws. Poster presented at Anatomy Connected, Portland, Oregon. Abstract: <em>Developmental Dynamics, 254(7).</em> https://doi.org/10.1002/dvdy.70058. </li>
                <li>Smith, T.D., Downing, S., Skeba, S.L., Hudson, V.R., Gordley, L.E., Burrows, A.M., Boughner, J.C., Prufrock, K.A., &DeLeon, V.B. 2025. Primate dental follicles seed nearby membranes with osteoblast precursors to build alveolar bone. Poster presented at Anatomy Connected, Portland, Oregon. Abstract: <em>Developmental Dynamics, 254(7).</em> https://doi.org/10.1002/dvdy.70058.</li>
            </ul>
        </div>
    )
}
