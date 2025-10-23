import React from 'react'

export default function SpeechBubble() {
    // need to create a speech bubble container
    // using svg?

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 400 200'>
            <defs>
                <ellipse id="bubble" cx="200" cy="100" rx="180" ry="90" />
            </defs>

            <g id="TextBubble">
                <use href="#bubble" style={{stroke: "black", strokeWidth: "6px", fill: "none"}} />
                <use href="#bubble" style={{stroke: "none", fill: "white"}} />
                <switch>
                    <foreignObject x="200" y="100" width="180" height="90" style={{textAnchor: "middle"}}>
                        <p xmlns="http://www.w3.org/1999/xhtml">I loved working on this model! It was really challenging.</p>
                    </foreignObject>

                    <text x="50%" y="50%">Your SVG viewer cannot display HTML.</text>
                </switch>
            </g>
            <path style={{stroke: "black", strokeWidth: "3px", fill: "white"}} d='
            M 200, 100
            l -100, 100
            l 120, -100
            '
            />
        </svg>
    )
}