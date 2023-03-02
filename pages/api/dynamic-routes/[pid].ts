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