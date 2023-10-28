

import axios from 'axios';
const handleRestapi = async (uri, method, paramOrBody = {}, headers = {}) => {
    const params = null;
    if (method === 'GET' && paramOrBody) {
        params = new URLSearchParams(paramOrBody);
        uri = `${uri}?${params.toString()}`;
    }
    const request = params !== null ? { url: uri, method: method, headers: headers } : { url: uri, method: method, data: paramOrBody, headers: headers, }
    const response = await axios({
        ...request, validateStatus: function (status) {
            return status >= 200 && status < 500
        },
    })
    return response;
}

export {
    handleRestapi
}