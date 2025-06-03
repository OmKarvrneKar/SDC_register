import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the primary purpose of React\'s virtual DOM?',
    options: [
      'To directly manipulate the browser\'s DOM',
      'To improve performance by minimizing actual DOM updates',
      'To store component state',
      'To handle routing in React applications'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Which of these is NOT a core principle of REST APIs?',
    options: [
      'Stateless communication',
      'Cacheable responses',
      'Required use of JSON',
      'Uniform interface'
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'What is the time complexity of binary search?',
    options: [
      'O(n)',
      'O(n²)',
      'O(log n)',
      'O(1)'
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: 'Which Git command creates a new branch and switches to it?',
    options: [
      'git branch new-branch',
      'git checkout -b new-branch',
      'git switch new-branch',
      'git create new-branch'
    ],
    correctAnswer: 1
  }
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const TechQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Quiz Complete!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your Score: {score}/{questions.length}
        </Typography>
        <Typography variant="body1" paragraph>
          {score === questions.length
            ? '🎉 Perfect score! You\'re a tech genius!'
            : score >= questions.length / 2
            ? '👏 Well done! Keep learning and improving!'
            : '📚 Keep practicing! You\'ll do better next time!'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={resetQuiz}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </StyledPaper>
    );
  }

  return (
    <Box>
      <StyledPaper>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Typography variant="h5" gutterBottom>
          {questions[currentQuestion].question}
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%', my: 2 }}>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                disabled={answered}
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {answered && (
          <Fade in={answered}>
            <Alert
              severity={selectedAnswer === questions[currentQuestion].correctAnswer ? "success" : "error"}
              sx={{ mb: 2 }}
            >
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? "Correct! 🎉"
                : `Incorrect. The correct answer was: ${
                    questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
                  }`}
            </Alert>
          </Fade>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={selectedAnswer === null || answered}
          fullWidth
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </StyledPaper>
    </Box>
  );
};

export default TechQuiz; 