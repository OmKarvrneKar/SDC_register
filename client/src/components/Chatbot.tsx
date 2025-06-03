import React, { useState, useRef, useEffect } from 'react';
import { Paper, Box, Typography, TextField, IconButton, List, ListItem, Fade, Zoom } from '@mui/material';
import { Send as SendIcon, Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { generateResponse } from '../services/chatbotService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  options?: string[];
}

const Chatbot: React.FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hello! Welcome to MVJ College Software Development Club. How can I help you today?",
          isUser: false,
          options: [
            "How to register?",
            "What are the requirements?",
            "Tell me about club activities",
            "What are the benefits?"
          ]
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || !input.value.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.value,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    input.value = "";

    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response.text,
        isUser: false,
        options: response.options
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    const cleanOption = option.replace(/^[•\d]\.\s*/, '');
    const userMessage: Message = {
      id: Date.now().toString(),
      text: cleanOption,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(cleanOption);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response.text,
        isUser: false,
        options: response.options
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <Zoom in={!isOpen}>
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            width: 56,
            height: 56,
            boxShadow: 3,
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </IconButton>
      </Zoom>

      <Fade in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">SDC Assistant</Typography>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: '#f5f5f5',
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    bgcolor: message.isUser ? theme.palette.primary.main : 'white',
                    color: message.isUser ? 'white' : 'inherit',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                  {message.options && !message.isUser && (
                    <List sx={{ mt: 1, p: 0 }}>
                      {message.options.map((option, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          sx={{
                            p: 1,
                            cursor: 'pointer',
                            borderRadius: 1,
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                        >
                          <Typography variant="body2" color="primary">
                            {option}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Paper>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', gap: 0.5, p: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.grey[400],
                    animation: 'bounce 0.8s infinite',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.grey[400],
                    animation: 'bounce 0.8s infinite',
                    animationDelay: '0.2s',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.grey[400],
                    animation: 'bounce 0.8s infinite',
                    animationDelay: '0.4s',
                  }}
                />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              bgcolor: 'white',
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              size="small"
              placeholder="Type your message..."
              variant="outlined"
              autoComplete="off"
            />
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </>
  );
};

export default Chatbot; 