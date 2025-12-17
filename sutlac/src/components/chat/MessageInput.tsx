import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface MessageInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled = false }) => {
    const [text, setText] = React.useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                p: 2,
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#fff',
            }}
        >
            <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                    },
                }}
            />
            <IconButton
                color="primary"
                onClick={handleSend}
                disabled={disabled || !text.trim()}
                sx={{
                    backgroundColor: '#0D47A1',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#0a3a8a',
                    },
                    '&.Mui-disabled': {
                        background: '#e0e0e0',
                        color: '#9e9e9e',
                    },
                }}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
