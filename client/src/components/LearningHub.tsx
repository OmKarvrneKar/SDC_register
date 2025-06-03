import React from 'react';
import { Container, Box, Typography, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import AchievementSystem from './gamification/AchievementSystem';
import TechQuiz from './gamification/TechQuiz';
import InteractiveVideo from './gamification/InteractiveVideo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LearningHub: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          SDC Learning Hub
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
          Track your progress, test your knowledge, and learn from interactive content
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="learning hub sections"
          >
            <Tab label="Achievements" />
            <Tab label="Technical Quiz" />
            <Tab label="Video Resources" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <AchievementSystem />
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <TechQuiz />
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <InteractiveVideo
            videoUrl="/path/to/your/video.mp4"
            title="Welcome to SDC"
            description="Learn about our club's mission, activities, and opportunities for growth."
          />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default LearningHub; 