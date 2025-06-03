import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface VideoBackgroundProps {
  videoUrl: string;
}

const VideoWrapper = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)', // Overlay to make text more readable
  }
});

const Video = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
  return (
    <VideoWrapper>
      <Video
        autoPlay
        muted
        loop
        playsInline
        src={videoUrl}
      />
    </VideoWrapper>
  );
};

export default VideoBackground; 