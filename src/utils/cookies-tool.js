export function setCookie(name, value, path = '/', days = 30) {
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${exp.toGMTString()};path=${path}`;
}


export function getCookie(name) {
    let arr;
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return arr[2];
    } else {
        return null;
    }

}

export function delCookie(name, path = '/') {
    const cval = getCookie(name);
    if (cval != null) {
        document.cookie = `${name}=${cval};expires=${new Date(0).toUTCString()};path=${path}`;
    }
} 