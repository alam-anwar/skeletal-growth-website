import React, {useEffect} from 'react'

export default function Home() {
        document.title = 'Home - Skeletal Growth'

        return (
        <>
            <div className="root-element">
                <h1>Welcome!</h1>
                <p>This is the website for the Skeletal Growth team.</p>
                <p>Stay tuned as we update this website with more information!</p>
            </div>
        </>
    )
}
