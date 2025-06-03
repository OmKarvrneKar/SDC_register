import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
  Fade,
} from '@mui/material';
import {
  Code,
  Group,
  School,
  WorkspacePremium,
} from '@mui/icons-material';
import VideoBackground from './VideoBackground';

const features = [
  {
    icon: <Code fontSize="large" />,
    title: 'Hands-on Coding',
    description: 'Work on real projects and enhance your programming skills',
  },
  {
    icon: <Group fontSize="large" />,
    title: 'Collaborative Learning',
    description: 'Learn and grow together with like-minded peers',
  },
  {
    icon: <School fontSize="large" />,
    title: 'Technical Workshops',
    description: 'Regular workshops on latest technologies and best practices',
  },
  {
    icon: <WorkspacePremium fontSize="large" />,
    title: 'Industry Exposure',
    description: 'Interact with industry experts and work on industry-standard projects',
  },
];

const Home: React.FC = () => {
  return (
    <>
      <VideoBackground videoUrl="E:\omkar_mvj\sof\client\public\mvjce_clg.mp4" />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              pt: { xs: 12, md: 20 },
              pb: { xs: 8, md: 12 },
              textAlign: 'center',
            }}
          >
            <Fade in timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Software Development Club
              </Typography>
            </Fade>

            <Fade in timeout={1500}>
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}
              >
                Transform your passion for coding into professional excellence
              </Typography>
            </Fade>

            <Fade in timeout={2000}>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Join SDC
                </Button>
                <Button
                  component={RouterLink}
                  to="/learn"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: '#2196F3',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  Explore Resources
                </Button>
              </Box>
            </Fade>
          </Box>

          <Box sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={feature.title}>
                  <Fade in timeout={2000 + (index * 500)}>
                    <Card
                      sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          textAlign: 'center',
                          color: 'white',
                        }}
                      >
                        <Box sx={{ color: '#2196F3', mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: 'white' }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home; 