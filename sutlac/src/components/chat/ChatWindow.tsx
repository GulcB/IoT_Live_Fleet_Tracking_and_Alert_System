import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Tabs,
    Tab,
    IconButton,
    Typography,
    Slide,
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { useChatContext } from '../../utils/ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import ChatService from '../../services/chatService';
import type { Message, ChatChannel } from '../../types/chat';
import '../../components/chat/chat.css';

// Mock user - In a real app, this would come from auth context
const CURRENT_USER = {
    id: 'admin_user',
    name: 'Admin',
};

export const ChatWindow: React.FC = () => {
    const { isOpen, closeChat, activeChannel, selectedVehicleId, switchToChannel } =
        useChatContext();

    const [currentTab, setCurrentTab] = useState<'general' | 'private'>('general');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generalChannel: ChatChannel = {
        id: ChatService.getGeneralChannelId(),
        type: 'general',
        name: 'General Channel',
    };

    // Update tab when active channel changes
    useEffect(() => {
        if (activeChannel.type === 'general') {
            setCurrentTab('general');
        } else {
            setCurrentTab('private');
        }
    }, [activeChannel]);

    // Subscribe to messages when channel changes
    useEffect(() => {
        if (!isOpen) return;

        setLoading(true);
        setError(null);

        try {
            const unsubscribe = ChatService.subscribeToChannel(
                activeChannel.id,
                (newMessages) => {
                    setMessages(newMessages);
                    setLoading(false);
                }
            );

            return () => {
                unsubscribe();
            };
        } catch (err) {
            console.error('Error subscribing to channel:', err);
            setError('Error loading messages. Please check Firebase configuration.');
            setLoading(false);
        }
    }, [activeChannel.id, isOpen]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: 'general' | 'private') => {
        setCurrentTab(newValue);
        if (newValue === 'general') {
            switchToChannel(generalChannel);
        } else if (selectedVehicleId && activeChannel.type === 'private') {
            switchToChannel(activeChannel);
        }
    };

    const handleSendMessage = async (text: string) => {
        try {
            await ChatService.sendMessage(
                activeChannel.id,
                text,
                CURRENT_USER.id,
                CURRENT_USER.name
            );
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please check Firebase configuration.');
        }
    };

    const handleMinimize = () => {
        closeChat();
    };

    return (
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
            <Paper
                elevation={8}
                className="chat-window-slide"
                sx={{
                    position: 'fixed',
                    bottom: 96,
                    right: 24,
                    width: 380,
                    height: 550,
                    maxHeight: 'calc(100vh - 120px)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1300,
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        backgroundColor: '#0D47A1',
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        Pulse Chat
                    </Typography>
                    <Box>
                        <IconButton
                            size="small"
                            onClick={handleMinimize}
                            sx={{ color: 'white', mr: 0.5 }}
                        >
                            <MinimizeIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={closeChat}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {/* Tabs */}
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: '#fafafa',
                        minHeight: 48,
                    }}
                >
                    <Tab
                        label="General Channel"
                        value="general"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                        }}
                    />
                    <Tab
                        label={
                            selectedVehicleId
                                ? activeChannel.vehiclePlate
                                    ? `${activeChannel.vehiclePlate}`
                                    : 'Private with Driver'
                                : 'Select Driver'
                        }
                        value="private"
                        disabled={!selectedVehicleId}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                        }}
                    />
                </Tabs>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" onClose={() => setError(null)} sx={{ m: 1 }}>
                        {error}
                    </Alert>
                )}

                {/* Messages */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                    }}
                >
                    {currentTab === 'private' && !selectedVehicleId ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                p: 3,
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Select a vehicle from the map to chat with the driver.
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <MessageList
                                messages={messages}
                                loading={loading}
                                currentUserId={CURRENT_USER.id}
                            />
                            <MessageInput onSend={handleSendMessage} disabled={loading} />
                        </>
                    )}
                </Box>
            </Paper>
        </Slide>
    );
};

export default ChatWindow;
