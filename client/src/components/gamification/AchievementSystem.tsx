import React from 'react';
import { Box, Paper, Typography, LinearProgress, Grid, Tooltip, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  EmojiEvents as TrophyIcon,
  School as GraduationIcon,
  Code as CodeIcon,
  Psychology as BrainIcon,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  isUnlocked: boolean;
}

const StyledBadge = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const achievements: Achievement[] = [
  {
    id: 'registration',
    title: 'Getting Started',
    description: 'Complete your SDC registration',
    progress: 100,
    icon: <TrophyIcon color="primary" sx={{ fontSize: 40 }} />,
    isUnlocked: true,
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete all technical quizzes',
    progress: 60,
    icon: <BrainIcon color="primary" sx={{ fontSize: 40 }} />,
    isUnlocked: false,
  },
  {
    id: 'code_ninja',
    title: 'Code Ninja',
    description: 'Submit 5 coding challenges',
    progress: 40,
    icon: <CodeIcon color="primary" sx={{ fontSize: 40 }} />,
    isUnlocked: false,
  },
  {
    id: 'learning_path',
    title: 'Learning Path',
    description: 'Complete the orientation program',
    progress: 80,
    icon: <GraduationIcon color="primary" sx={{ fontSize: 40 }} />,
    isUnlocked: false,
  },
];

const AchievementSystem: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Achievements
      </Typography>
      
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={3} key={achievement.id}>
            <Tooltip title={achievement.description} arrow>
              <StyledBadge>
                <Badge
                  badgeContent={achievement.isUnlocked ? '✓' : ''}
                  color="success"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1.1rem',
                      height: '22px',
                      minWidth: '22px',
                    },
                  }}
                >
                  {achievement.icon}
                </Badge>
                <Typography variant="h6" align="center">
                  {achievement.title}
                </Typography>
                <Box sx={{ width: '100%', mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={achievement.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 0.5 }}
                  >
                    {achievement.progress}%
                  </Typography>
                </Box>
              </StyledBadge>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AchievementSystem; 