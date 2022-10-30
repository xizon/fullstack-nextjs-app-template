import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({
        "page": 1,
        "per_page": 5,
        "total": 13,
        "total_pages": 3,
        "data": [
            {
                "id": 1,
                "email": "george.bluth@reqres.in",
                "name": "George",
                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAGFBMVEXMzMyWlpbFxcW3t7eqqqq+vr6xsbGjo6NdFKDtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVRoge3SUQmAQBRE0WXRAC+C22AjbBcL2P9HQwwick6ACwPTGgAAAADfcFSuNYOtlWv1yrW2XKuvVGs/r0q1noG/b/UxRvATTUtLS0tLSwsAAADgTTdZSAdIz1EiEwAAAABJRU5ErkJggg=="
            },
            {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "name": "Janet",
                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAGFBMVEXMzMyWlpbFxcW3t7eqqqq+vr6xsbGjo6NdFKDtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVRoge3SUQmAQBRE0WXRAC+C22AjbBcL2P9HQwwick6ACwPTGgAAAADfcFSuNYOtlWv1yrW2XKuvVGs/r0q1noG/b/UxRvATTUtLS0tLSwsAAADgTTdZSAdIz1EiEwAAAABJRU5ErkJggg=="
            },
            {
                "id": 3,
                "email": "emma.wong@reqres.in",
                "name": "Emma",
                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAGFBMVEXMzMyWlpbFxcW3t7eqqqq+vr6xsbGjo6NdFKDtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVRoge3SUQmAQBRE0WXRAC+C22AjbBcL2P9HQwwick6ACwPTGgAAAADfcFSuNYOtlWv1yrW2XKuvVGs/r0q1noG/b/UxRvATTUtLS0tLSwsAAADgTTdZSAdIz1EiEwAAAABJRU5ErkJggg=="
            },
            {
                "id": 4,
                "email": "eve.holt@reqres.in",
                "name": "Eve",
                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAGFBMVEXMzMyWlpbFxcW3t7eqqqq+vr6xsbGjo6NdFKDtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVRoge3SUQmAQBRE0WXRAC+C22AjbBcL2P9HQwwick6ACwPTGgAAAADfcFSuNYOtlWv1yrW2XKuvVGs/r0q1noG/b/UxRvATTUtLS0tLSwsAAADgTTdZSAdIz1EiEwAAAABJRU5ErkJggg=="
            },
            {
                "id": 5,
                "email": "charles.morris@reqres.in",
                "name": "Charles",
                "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAGFBMVEXMzMyWlpbFxcW3t7eqqqq+vr6xsbGjo6NdFKDtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAWElEQVRoge3SUQmAQBRE0WXRAC+C22AjbBcL2P9HQwwick6ACwPTGgAAAADfcFSuNYOtlWv1yrW2XKuvVGs/r0q1noG/b/UxRvATTUtLS0tLSwsAAADgTTdZSAdIz1EiEwAAAABJRU5ErkJggg=="
            }
        ]
    })
}






