import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  useTheme,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  Description,
  Assessment,
  Group,
  CheckCircle,
  School,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.005)',
  },
}));

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  '&:hover .MuiTimelineContent-root': {
    transform: 'translateY(-5px)',
  },
  '& .MuiTimelineContent-root': {
    transition: 'transform 0.3s ease',
  },
}));

const StyledTimelineDot = styled(TimelineDot)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: theme.shadows[4],
  },
}));

const Timeline = () => {
  const theme = useTheme();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      title: 'Submit Application',
      description: 'Fill out the registration form with your details and background information.',
      icon: <Description />,
      date: 'Step 1',
      details: 'Provide your personal information, academic details, skills, and motivation to join SDC.',
    },
    {
      title: 'Application Review',
      description: 'Our team carefully evaluates your application based on various criteria.',
      icon: <Assessment />,
      date: 'Step 2',
      details: 'Applications are reviewed for technical skills, project experience, and enthusiasm.',
    },
    {
      title: 'Technical Interview',
      description: 'Selected candidates will be invited for a technical discussion.',
      icon: <Group />,
      date: 'Step 3',
      details: 'A friendly chat about your technical knowledge, projects, and interests in software development.',
    },
    {
      title: 'SDC Orientation',
      description: 'Welcome to the Software Development Club!',
      icon: <School />,
      date: 'Step 4',
      details: 'Learn about club activities, meet fellow members, and get started with your journey.',
    },
    {
      title: 'Active Membership',
      description: 'Begin your journey as an active SDC member.',
      icon: <CheckCircle />,
      date: 'Final Step',
      details: 'Participate in projects, workshops, and contribute to the SDC community.',
    },
  ];

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Journey to SDC
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Follow these steps to become a member of our vibrant community
            </Typography>
          </Box>

          <MuiTimeline position="alternate">
            {steps.map((step, index) => (
              <Zoom in timeout={500 + index * 200} key={index}>
                <StyledTimelineItem
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <TimelineOppositeContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {step.date}
                    </Typography>
                  </TimelineOppositeContent>
                  
                  <TimelineSeparator>
                    <StyledTimelineDot 
                      color={hoveredStep === index ? "secondary" : "primary"}
                      sx={{
                        p: 1,
                        boxShadow: hoveredStep === index ? 4 : 1,
                      }}
                    >
                      {step.icon}
                    </StyledTimelineDot>
                    {index < steps.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          bgcolor: hoveredStep === index ? theme.palette.secondary.main : undefined,
                          transition: 'background-color 0.3s ease',
                        }}
                      />
                    )}
                  </TimelineSeparator>

                  <TimelineContent>
                    <Paper 
                      elevation={hoveredStep === index ? 4 : 1}
                      sx={{ 
                        p: 3,
                        transition: 'all 0.3s ease',
                        bgcolor: hoveredStep === index ? 'rgba(255, 255, 255, 0.95)' : 'background.paper',
                        borderLeft: `4px solid ${hoveredStep === index ? theme.palette.secondary.main : theme.palette.primary.main}`,
                      }}
                    >
                      <Typography variant="h6" component="h3" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography>{step.description}</Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mt: 1,
                          height: hoveredStep === index ? 'auto' : 0,
                          opacity: hoveredStep === index ? 1 : 0,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {step.details}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </StyledTimelineItem>
              </Zoom>
            ))}
          </MuiTimeline>
        </StyledPaper>
      </Container>
    </Fade>
  );
};

export default Timeline; 