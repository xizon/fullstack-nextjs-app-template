import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    res.status(200).send([{
        "name": "Demo Name",
        "topLevelDomain": [".af"],
        "alpha2Code": "AF",
        "alpha3Code": "AFG",
        "callingCodes": ["93"],
        "capital": "Kabul",
        "altSpellings": ["AF", "Afġānistān"],
        "region": "Asia",
        "subregion": "Southern Asia",
        "population": 27657145,
        "latlng": [33.0, 65.0],
        "demonym": "Afghan",
        "area": 652230.0,
        "gini": 27.8,
        "timezones": ["UTC+04:30"],
        "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
        "nativeName": "افغانستان",
        "numericCode": "004",
        "currencies": [{
            "code": "AFN",
            "name": "Afghan afghani",
            "symbol": "؋"
        }],
        "languages": [{
            "iso639_1": "ps",
            "iso639_2": "pus",
            "name": "Pashto",
            "nativeName": "پښتو"
        },
        {
            "iso639_1": "uz",
            "iso639_2": "uzb",
            "name": "Uzbek",
            "nativeName": "Oʻzbek"
        },
        {
            "iso639_1": "tk",
            "iso639_2": "tuk",
            "name": "Turkmen",
            "nativeName": "Türkmen"
        }],
        "translations": {
            "de": "Afghanistan",
            "es": "Afganistán",
            "fr": "Afghanistan",
            "ja": "アフガニスタン",
            "it": "Afghanistan",
            "br": "Afeganistão",
            "pt": "Afeganistão",
            "nl": "Afghanistan",
            "hr": "Afganistan",
            "fa": "افغانستان"
        },
        "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
        "regionalBlocs": [{
            "acronym": "SAARC",
            "name": "South Asian Association for Regional Cooperation",
            "otherAcronyms": [],
            "otherNames": []
        }],
        "cioc": "AFG"
    }])
}






