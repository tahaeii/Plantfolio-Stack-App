export class Notification {

    constructor(
        public id: number,
        public type: NotificationType,
        public message: string,
        public timeout: number,
        public startTime: number = Date.now(),
        public progress: number = 0
    ) { }

}

export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}