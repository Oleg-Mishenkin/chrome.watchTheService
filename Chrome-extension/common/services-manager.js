class ServicesManager {
    constructor(host) {
        this.host = host;
    }

    setHost(host) {
        this.host = host;
    }

    start(serviceName) {
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'name': serviceName })
        };
        return fetch(this.appendUrl(this.host, `start`));
    }

    stop(serviceName) {
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'name': serviceName })
        };
        return fetch(this.appendUrl(this.host, `stop`));
    }

    getServices(namepattern) {
        return new Promise((resolve, reject) => {
            fetch(this.appendUrl(this.host, `all/${namepattern}`)).then(function (res) {
                resolve(res.json());
            }).catch(reject);
        })
    }

    appendUrl(url1, url2) {
        if (url1.endsWith('/')) return url1 + url2;
        else return url1 + '/' + url2;
    }
}

export default ServicesManager;