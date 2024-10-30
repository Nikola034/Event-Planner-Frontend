import { EventType } from "./event-type";

export interface Event {
    id: number;
    title: string;
    description: string;
    maxParticipants: number;
    public: boolean;
    address: string;
    date: Date;
    type: EventType
}
