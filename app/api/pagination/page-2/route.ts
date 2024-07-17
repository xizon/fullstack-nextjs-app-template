import { NextResponse } from "next/server";

type Data = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
}

const callback = {
    "page": 2,
    "per_page": 5,
    "total": 13,
    "total_pages": 3,
    "data": [
        {
            "id": 6,
            "email": "george.bluth@reqres.in",
            "name": "George(page 2)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9UlEQVRoge3VMW7CMBiG4WBIyNivkNIRygW4gpF6AQZm1KFzGdgBqfeujcsJ/CExvM/i7VV+O3GaBgAAAAAAAM9g/an9jyc1VjJfWloxt7RzpLpbSoOjddRwDb/SxtCKt/GiXupTQcpnuNJ7favXPC+d3upbnWZ5mTo2f6JFXoKj1ZZWI9W3RnrNi+W5uu+DrfVvXI7Toi3HaRHLtjmkD/xgSoWoYWlqnWQbMd2sg+mSThNq60ml29D2QvS+CZuL9GVKTeW4UovWN2EaceFKpS/x7EoF42XT+3Y+/zs+ivpWq7v61sjYWhlbR2MLAAAAAADgwf4A/NkWbYkY/vEAAAAASUVORK5CYII="
        },
        {
            "id": 7,
            "email": "janet.weaver@reqres.in",
            "name": "Janet(page 2)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9UlEQVRoge3VMW7CMBiG4WBIyNivkNIRygW4gpF6AQZm1KFzGdgBqfeujcsJ/CExvM/i7VV+O3GaBgAAAAAAAM9g/an9jyc1VjJfWloxt7RzpLpbSoOjddRwDb/SxtCKt/GiXupTQcpnuNJ7favXPC+d3upbnWZ5mTo2f6JFXoKj1ZZWI9W3RnrNi+W5uu+DrfVvXI7Toi3HaRHLtjmkD/xgSoWoYWlqnWQbMd2sg+mSThNq60ml29D2QvS+CZuL9GVKTeW4UovWN2EaceFKpS/x7EoF42XT+3Y+/zs+ivpWq7v61sjYWhlbR2MLAAAAAADgwf4A/NkWbYkY/vEAAAAASUVORK5CYII="
        },
        {
            "id": 8,
            "email": "emma.wong@reqres.in",
            "name": "Emma(page 2)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9UlEQVRoge3VMW7CMBiG4WBIyNivkNIRygW4gpF6AQZm1KFzGdgBqfeujcsJ/CExvM/i7VV+O3GaBgAAAAAAAM9g/an9jyc1VjJfWloxt7RzpLpbSoOjddRwDb/SxtCKt/GiXupTQcpnuNJ7favXPC+d3upbnWZ5mTo2f6JFXoKj1ZZWI9W3RnrNi+W5uu+DrfVvXI7Toi3HaRHLtjmkD/xgSoWoYWlqnWQbMd2sg+mSThNq60ml29D2QvS+CZuL9GVKTeW4UovWN2EaceFKpS/x7EoF42XT+3Y+/zs+ivpWq7v61sjYWhlbR2MLAAAAAADgwf4A/NkWbYkY/vEAAAAASUVORK5CYII="
        },
        {
            "id": 9,
            "email": "eve.holt@reqres.in",
            "name": "Eve(page 2)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9UlEQVRoge3VMW7CMBiG4WBIyNivkNIRygW4gpF6AQZm1KFzGdgBqfeujcsJ/CExvM/i7VV+O3GaBgAAAAAAAM9g/an9jyc1VjJfWloxt7RzpLpbSoOjddRwDb/SxtCKt/GiXupTQcpnuNJ7favXPC+d3upbnWZ5mTo2f6JFXoKj1ZZWI9W3RnrNi+W5uu+DrfVvXI7Toi3HaRHLtjmkD/xgSoWoYWlqnWQbMd2sg+mSThNq60ml29D2QvS+CZuL9GVKTeW4UovWN2EaceFKpS/x7EoF42XT+3Y+/zs+ivpWq7v61sjYWhlbR2MLAAAAAADgwf4A/NkWbYkY/vEAAAAASUVORK5CYII="
        },
        {
            "id": 10,
            "email": "charles.morris@reqres.in",
            "name": "Charles(page 2)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9UlEQVRoge3VMW7CMBiG4WBIyNivkNIRygW4gpF6AQZm1KFzGdgBqfeujcsJ/CExvM/i7VV+O3GaBgAAAAAAAM9g/an9jyc1VjJfWloxt7RzpLpbSoOjddRwDb/SxtCKt/GiXupTQcpnuNJ7favXPC+d3upbnWZ5mTo2f6JFXoKj1ZZWI9W3RnrNi+W5uu+DrfVvXI7Toi3HaRHLtjmkD/xgSoWoYWlqnWQbMd2sg+mSThNq60ml29D2QvS+CZuL9GVKTeW4UovWN2EaceFKpS/x7EoF42XT+3Y+/zs+ivpWq7v61sjYWhlbR2MLAAAAAADgwf4A/NkWbYkY/vEAAAAASUVORK5CYII="
        }
    ]
};

// To handle a GET request to /api/pagination/page-2
export async function GET(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}


// To handle a POST request to /api/pagination/page-2
export async function POST(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}




