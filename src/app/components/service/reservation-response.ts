export interface ReservationResponse {
    providerId: number;
    eventId: number;
    serviceId: number;
    startTime: Date;
    endTime: Date;
    providerEmail: string;
}