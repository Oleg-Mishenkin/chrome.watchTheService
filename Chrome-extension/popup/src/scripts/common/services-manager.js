class ServicesManager {
    constructor(host) {
        this.host = host;
        this.services = [];
    }

    setHost(host) {
        this.host = host;
    }

    start(serviceName) {
        return fetch(this.appendUrl(host, `start/${serviceName}`));
    }

    stop(serviceName) {
        return fetch(this.appendUrl(host, `stop/${serviceName}`));
    }

    getServices(namepattern) {
        return fetch(this.appendUrl(host, `all/${namepattern}`));
    }

    appendUrl(url1, url2) {
        if (url1.endsWith('/')) return url1 + url2;
        else return url1 + '/' + url2;
    }
}

export default ServicesManager;