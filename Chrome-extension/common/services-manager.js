class ServicesManager {
    constructor(host) {
        this.host = host;
    }

    setHost(host) {
        this.host = host;
    }

    start(serviceName) {
        return fetch(this.appendUrl(this.host, `start/${serviceName}`));
    }

    stop(serviceName) {
        return fetch(this.appendUrlthis.host, `stop/${serviceName}`);
    }

    getServices(namepattern) {
        return new Promise((resolve, reject) => {
            fetch(this.appendUrl(this.host, `all/${namepattern}`)).then(function (res) {
                resolve(res.json());
            });
        })
    }

    appendUrl(url1, url2) {
        if (url1.endsWith('/')) return url1 + url2;
        else return url1 + '/' + url2;
    }
}

export default ServicesManager;