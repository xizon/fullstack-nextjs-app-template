'use client'


export default function ClientPage({ currentData }) {

    // no date
    //---------
    if (currentData === null) return null;

    //
    //---------    
    return (
        <>


            {/** Title */}
            <h2>{currentData}</h2>

            {/** Content */}
            <p>Nested Routes: {currentData}</p>

        </>
    )
}

