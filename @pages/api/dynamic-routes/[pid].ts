export default function handler(req, res) {
    const { pid } = req.query;
    let mydata;

    switch (pid) {

        case 'page1':

            mydata = {
                "data":
                {
                    "title": "Title 1"
                },
                "message": "OK",
                "code": 200

            };
            break;



        case 'page2':

            mydata = {
                "data":
                {
                    "title": "Title 2"
                },
                "message": "OK",
                "code": 200

            };
            break;


    }

    res.status(200).json(mydata);

}



/*
[App Router:]
==== app/api/dynamic-routes/[pid]/route.ts ====
==== !!! Warning: Make an error of `missing "generateStaticParams()" so it cannot be used with "output: export" config` when using App Router ====


import { NextResponse } from "next/server";


const callback = (pid) => {
    let mydata;

    switch (pid) {

        case 'page1':

            mydata = {
                "data":
                {
                    "title": "Title 1"
                },
                "message": "OK",
                "code": 200

            };
            break;



        case 'page2':

            mydata = {
                "data":
                {
                    "title": "Title 2"
                },
                "message": "OK",
                "code": 200

            };
            break;


    }

    return mydata;
};



// To handle a GET request to /api/dynamic-routes/xxxx
export async function GET(
    req: Request,
    { params }: { params: { pid: string } }
) {

    const slug = params.pid;

    return NextResponse.json(callback(slug), {
        status: 200
    });

}

// To handle a POST request to /api/dynamic-routes/xxxx
export async function POST(
    req: Request,
    { params }: { params: { pid: string } }
) {
    const slug = params.pid;

    return NextResponse.json(callback(slug), {
        status: 200
    });

}
*/