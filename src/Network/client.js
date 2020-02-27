export function isDev() {
    var domain = window.location.href.split('/')[2].split(':')[0];
    if (domain === "localhost" || domain === "127.0.0.1") {
      return true;
    }
    return false;
  }

  function isStaging() {
    let stagingVariable = localStorage.getItem('genstemStaging');
    if (stagingVariable === null | stagingVariable === 'staging') {
      return true;
    }
    return false;
  }
  
  function getDomainName() {
    isDev(); // comment me out please
    //
    //return 'http://localhost:8000';
    if (isDev()) {
      if (isStaging()) {
        return 'http://staging.backend.genstem.jakoblj.xyz';
      } else {
        return 'http://localhost:8000';
      }
    }
    return 'https://backend.genstem.jakoblj.com';
  }
  
  function getToken() {
    return localStorage.getItem('genstemToken');
  }
  
  
  
  export function postData(url = ``, data = {}) {
  return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          'Authorization' : `Bearer ${getToken()}`
  
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => {
    return response.json()
  }); // parses JSON response into native Javascript objects
  }
  
  
  
  export function getWithOutHandleErr(extension, addApi=true) {
    var url;
    if (addApi) {
      url = `${getDomainName()}/api${extension}`;
    } else {
      url = `${getDomainName()}${extension}`;
    }
    let token = getToken();
    let headers = {};
    if (token != null) {
      headers = {
        Authorization: `Bearer ${token}`
      };
    }
    return fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      headers: headers
    });
  }
  
  export function get(extension, addApi=true) {
    var url;
    if (addApi) {
      url = `${getDomainName()}/api${extension}`;
    } else {
      url = `${getDomainName()}${extension}`;
    }
    let token = getToken();
    let headers = {};
    if (token != null) {
      headers = {
        Authorization: `Bearer ${token}`
      };
    }
    return fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: headers,
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    }).then(async result=> {
      handleErrCode(result.status);
      try {
        var r = await result.json();
        return r;
      } catch(e) {
        console.log(result.status);
        return handleErrCode(result.status);
      }
    });
  }
  
  export function post(extension, data, addApi=true, herrCode=true) {
    console.log(JSON.stringify(data));
    var url;
    if (addApi) {
      url = `${getDomainName()}/api${extension}`;
    } else {
      url = `${getDomainName()}${extension}`;
    }
    var token = getToken();
    var body = {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      headers: {
        'Content-type':'Application/JSON',
      },
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data),
    }
    if (token !== null) {
      body.headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, body).then(async (result) => {
      if (herrCode) {
        handleErrCode(result.status);
      }
      try {
        var r = await result.json();
        return r;
      } catch(e) {
        console.log(result.status);
        console.log('handeling');
        return handleErrCode(result.status);
      }
    });
  }
  
  export function put(extension, data, addApi=true) {
    console.log(JSON.stringify(data));
    var url;
    if (addApi) {
      url = `${getDomainName()}/api${extension}`;
    } else {
      url = `${getDomainName()}${extension}`;
    }
    var token = getToken();
    var body = {
      method: 'PUT',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      headers: {
        'Content-type':'Application/JSON',
      },
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data),
    }
    if (token !== null) {
      body.headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, body).then(async (result) => {
      handleErrCode(result.status);
      try {
        var r = await result.json();
        return r;
      } catch(e) {
        console.log(result.status);
        return handleErrCode(result.status);
      }
    });
  }
  
  export function apiDelete(extension, addApi=true) {
    var url;
    if (addApi) {
      url = `${getDomainName()}/api${extension}`;
    } else {
      url = `${getDomainName()}${extension}`;
    }
    var token = getToken();
    var body = {
      method: 'DElETE',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {},
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    }
    if (token !== null) {
      body.headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, body).then(async (result) => {
      handleErrCode(result.status);
      try {
        var r = await result.json();
        return r;
      } catch(e) {
        console.log(result.status);
        return handleErrCode(result.status);
      }
    });
  }
  
  
  function handleErrCode(code) {
    if (code === 200) {
      return true;
    } else if (code === 403 || code === 401) {
      window.location.href='/app/logout';
    }
    return false;
  }

export function loginUser(token) {
  localStorage.setItem("genstemToken", token);
}