import React, { useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import type { Message } from '../../types/chat';
import '../../components/chat/chat.css';

interface MessageListProps {
    messages: Message[];
    loading?: boolean;
    currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    loading = false,
    currentUserId,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress size={32} />
            </Box>
        );
    }

    if (messages.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: '#9e9e9e',
                }}
            >
                <Typography variant="body2">No messages yet. Send the first one!</Typography>
            </Box>
        );
    }

    return (
        <Box
            className="chat-messages-container"
            sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {messages.map((message) => {
                const isSent = message.sender === currentUserId;
                return (
                    <Box
                        key={message.id}
                        sx={{
                            display: 'flex',
                            justifyContent: isSent ? 'flex-end' : 'flex-start',
                            mb: 1,
                        }}
                    >
                        <Box
                            className={`message-bubble ${isSent ? 'message-bubble-sent' : 'message-bubble-received'
                                }`}
                        >
                            {!isSent && (
                                <Typography className="message-sender">
                                    {message.senderName}
                                </Typography>
                            )}
                            <Typography className="message-text">{message.text}</Typography>
                            <Typography className="message-timestamp">
                                {formatTimestamp(message.timestamp)}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
            <div ref={messagesEndRef} />
        </Box>
    );
};

export default MessageList;
