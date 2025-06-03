import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Fullscreen,
  BookmarkBorder,
  CheckCircleOutline,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface VideoSegment {
  id: string;
  title: string;
  timestamp: number;
  description: string;
  isCompleted: boolean;
}

interface InteractiveVideoProps {
  videoUrl: string;
  title: string;
  description: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', // 16:9 Aspect Ratio
  backgroundColor: '#000',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
}));

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1),
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: 'white',
}));

const segments: VideoSegment[] = [
  {
    id: '1',
    title: 'Introduction to SDC',
    timestamp: 0,
    description: 'Overview of the Software Development Club',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Technical Focus Areas',
    timestamp: 120,
    description: 'Exploring different technologies and domains',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Project Showcase',
    timestamp: 300,
    description: 'Previous successful projects by SDC members',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Learning Path',
    timestamp: 480,
    description: 'Structured learning approach for new members',
    isCompleted: false,
  },
];

const InteractiveVideo: React.FC<InteractiveVideoProps> = ({ videoUrl, title, description }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<string>('1');
  const [completedSegments, setCompletedSegments] = useState<string[]>([]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const segment = segments.find(
        (s, index) =>
          currentTime >= s.timestamp &&
          (index === segments.length - 1 || currentTime < segments[index + 1].timestamp)
      );
      if (segment && segment.id !== currentSegment) {
        setCurrentSegment(segment.id);
        if (!completedSegments.includes(segment.id)) {
          setCompletedSegments(prev => [...prev, segment.id]);
        }
      }
    }
  };

  const jumpToSegment = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>

      <VideoContainer>
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          onTimeUpdate={handleTimeUpdate}
          src={videoUrl}
        />
        <VideoControls>
          <IconButton onClick={togglePlay} size="small" sx={{ color: 'white' }}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={toggleFullScreen} size="small" sx={{ color: 'white' }}>
            <Fullscreen />
          </IconButton>
        </VideoControls>
      </VideoContainer>

      <Typography variant="h6" gutterBottom>
        Video Segments
      </Typography>
      <List>
        {segments.map((segment) => (
          <ListItem
            key={segment.id}
            button
            onClick={() => jumpToSegment(segment.timestamp)}
            sx={{
              borderRadius: 1,
              mb: 1,
              bgcolor: currentSegment === segment.id ? 'action.selected' : 'transparent',
            }}
          >
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  {completedSegments.includes(segment.id) ? (
                    <CheckCircleOutline color="success" />
                  ) : (
                    <BookmarkBorder />
                  )}
                  <Typography>{segment.title}</Typography>
                </Box>
              }
              secondary={segment.description}
            />
            <Typography variant="body2" color="textSecondary">
              {Math.floor(segment.timestamp / 60)}:{(segment.timestamp % 60).toString().padStart(2, '0')}
            </Typography>
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default InteractiveVideo; 