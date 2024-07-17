'use client'


import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

import Pagination from '@/components/Pagination';


export default function ClientPage({ currentData, page, perPage }) {


    const [currentPage, setCurrentPage] = useState<number>(parseFloat(page));


    //
    const posts = currentData ? currentData.data : [];
    function handleGotoPageNumber(number) {

        //`number` comes from the public parameter thrown by the component `<Pagination />`
        //console.log( 'number: ', number );

        //
        setCurrentPage(number);
    }

    useEffect(() => {

        // page changed
        //-----
        setCurrentPage(parseFloat(page));

    }, [page]);

    //
    //---------    
    return (
        <>

            <Layout
                pageTitle={`Pagination(page ${page})`}
                contentComponent={<>
                    <ul>

                        {!posts ? <>Loading...</> : posts.map((item: any, i: number) => {
                            return (
                                <li key={i}>
                                    {item.name} - (email: {item.email})
                                </li>
                            );
                        })}
                    </ul>

                    <div>
                        <Pagination
                            apiUrl={`/pagination/{page}.html`}
                            gotoPageClickEvent={handleGotoPageNumber}
                            pageRangeDisplayed={2}
                            activePage={currentPage}
                            totalPages={currentData ? currentData.total_pages : 1}
                            previousLabel={<>Prev</>}
                            nextLabel={<>Next</>}
                            firstLabel={<>First</>}
                            lastLabel={<>Last</>}
                            align="center"
                            symmetry={true}
                            breakLabel="..."
                        />
                    </div>

                </>}
            />

        </>
    )
}

