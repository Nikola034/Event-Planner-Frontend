import { Address } from "./address";
import { EventType } from "./event-type";

export interface Event {
    id: number;
    title: string;
    description: string;
    maxParticipants: number;
    public: boolean;
    address: Address;
    date: Date;
    type: EventType
}
