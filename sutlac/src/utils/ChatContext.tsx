import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ChatChannel } from '../types/chat';
import ChatService from '../services/chatService';

interface ChatContextValue {
    isOpen: boolean;
    activeChannel: ChatChannel;
    selectedVehicleId: string | null;
    unreadCount: number;
    toggleChat: () => void;
    openChat: () => void;
    closeChat: () => void;
    setSelectedVehicle: (vehicleId: string | null, vehiclePlate?: string) => void;
    switchToChannel: (channel: ChatChannel) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const GENERAL_CHANNEL: ChatChannel = {
    id: ChatService.getGeneralChannelId(),
    type: 'general',
    name: 'Genel Kanal',
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeChannel, setActiveChannel] = useState<ChatChannel>(GENERAL_CHANNEL);
    const [selectedVehicleId, setSelectedVehicleIdState] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const toggleChat = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const openChat = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const setSelectedVehicle = useCallback((vehicleId: string | null, vehiclePlate?: string) => {
        setSelectedVehicleIdState(vehicleId);

        if (vehicleId) {
            const privateChannel: ChatChannel = {
                id: ChatService.getPrivateChannelId(vehicleId),
                type: 'private',
                vehicleId,
                vehiclePlate,
                name: `Sürücü ile Özel${vehiclePlate ? ` (${vehiclePlate})` : ''}`,
            };
            setActiveChannel(privateChannel);
        } else {
            setActiveChannel(GENERAL_CHANNEL);
        }
    }, []);

    const switchToChannel = useCallback((channel: ChatChannel) => {
        setActiveChannel(channel);
    }, []);

    useEffect(() => {
        setUnreadCount(0);
    }, []);

    const value: ChatContextValue = {
        isOpen,
        activeChannel,
        selectedVehicleId,
        unreadCount,
        toggleChat,
        openChat,
        closeChat,
        setSelectedVehicle,
        switchToChannel,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
