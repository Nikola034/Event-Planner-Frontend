export enum NotificationType{
    EVENT='EVENT',
    PRODUCT='PRODUCT',
    SERVICE='SERVICE'
}

export interface NotificationDTO {
    id?: number;
    content: string;
    read: boolean;
    date:Date;
    type:NotificationType,
    entityId:number
}
