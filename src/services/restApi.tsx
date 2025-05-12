import Cookies from 'js-cookie';

const apiRequest = async (url: string, useToken = false, useSessionId = false, method: string, body: any, headers: any) => {
  if (useToken) {
    const token = Cookies.get('access_token');
    if (token) {
      headers.Authorization = `Bearer ${Cookies.get('access_token') || ''}`;
    }
  }

  if (useSessionId) {
    // const sessionId = localStorage.getItem('sessionId');
    // if (sessionId) {
    //   headers['X-Session-Id'] = sessionId;
    // }
  }

  if (headers['content-type'] === 'application/json' && body) {
    body = JSON.stringify(body);
  }
  if (headers['content-type'] == 'image/jpeg') {
    return await fetch(url, {
      method: method,
      headers: headers,
      mode : "cors"
    })
    .then(async (response: any) => {
      return await response.blob();
    })
    .catch(error => {
      console.log(error);
      return {};
    });
  }
  return await fetch(url, {
    method: method,
    headers: headers,
    mode : "cors",
    body: (body !== '{}') ? body : undefined
  })
  .then(async (response: any) => {
    response.code = response.status;
    return await response.json();
  })
  .catch(error => {
    console.log(error);
    return {};
  });
};

const restApi = (url: string, useAccessToken = false, useSessionId = false) => {
  const get = (query: any = {}, headers : any = {}) => {
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json';
    }
    if (query !== '{}') {
      Object.entries(query)?.map(([key, value], index) => {
        url += (index == 0 ? '?' : '&') + key + '=' + value;
      });
    }
    return apiRequest(url, useAccessToken, useSessionId, 'get', {}, headers);
  };

  const post = (body: any, headers : any = {}) => {
    headers['content-type'] = 'application/json';
    return apiRequest(url, useAccessToken, useSessionId, 'post', body, headers);
  };

  const put = (body: any, headers : any = {}) => {
    headers['content-type'] = 'application/json';
    return apiRequest(url, useAccessToken, useSessionId, 'put', body, headers);
  };

  const del = (body: any, headers : any = {}) => {
    headers['content-type'] = 'application/json';
    return apiRequest(url, useAccessToken, useSessionId, 'delete', body, headers);
  };

  const upload = async (body: {} = {}, headers = {}, method = 'post') => {

    return apiRequest(url, useAccessToken, useSessionId, method, body, headers);
  };

  return {
    upload,
    get,
    post,
    put,
    delete: del,
  };
};

export default restApi;