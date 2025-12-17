export interface Message {
    id: string;
    text: string;
    sender: string;
    senderName: string;
    timestamp: number;
    read: boolean;
}

export interface ChatChannel {
    id: string;
    type: 'general' | 'private';
    vehicleId?: string;
    vehiclePlate?: string;
    name: string;
}

export interface ChatState {
    isOpen: boolean;
    activeChannel: ChatChannel;
    selectedVehicleId: string | null;
    unreadCount: number; 
}
