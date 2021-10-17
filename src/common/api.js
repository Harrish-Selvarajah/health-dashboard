export const BASE_URL = 'https://health-dashboard-backend.herokuapp.com';
// 'https://health-dashboard-backend.herokuapp.com'

const axios = require('axios').default;

export function sendHttpRequest(method, url, params = null, data = null, contentType = 'application/json') {
    url = params ? url + "?" + constructUrlWithParams(params) : url;

    var request = axios({
        method: method,
        headers: { 'Content-Type': contentType },
        url: url,
        data: data,
    });
    return request;
}

function constructUrlWithParams(params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query;
}