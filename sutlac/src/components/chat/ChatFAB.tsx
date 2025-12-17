import React from 'react';
import { Fab, Badge } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useChatContext } from '../../utils/ChatContext';
import '../../components/chat/chat.css';

export const ChatFAB: React.FC = () => {
    const { toggleChat, unreadCount } = useChatContext();

    return (
        <Fab
            color="primary"
            aria-label="chat"
            onClick={toggleChat}
            className="chat-fab-pulse"
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1300,
                backgroundColor: '#0D47A1',
                '&:hover': {
                    backgroundColor: '#0a3a8a',
                },
            }}
        >
            <Badge
                badgeContent={unreadCount}
                color="error"
                sx={{
                    '& .MuiBadge-badge': {
                        right: -3,
                        top: 3,
                        border: '2px solid white',
                        padding: '0 4px',
                    },
                }}
            >
                <ChatIcon />
            </Badge>
        </Fab>
    );
};

export default ChatFAB;
