export const ServiceStatus = {
    Running: 4,
    Starting: 2,
    Stopping: 3,
    Stopped: 1,
}

export function MapServiceStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'Stopped'
        case 2:
            return 'Starting'
        case 3:
            return 'Stopping'
        case 4:
            return 'Running'
    }
};