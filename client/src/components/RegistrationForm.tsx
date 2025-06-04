import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Styled components for enhanced visual design
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.005)',
  },
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const ImageContainer = styled(Box)({
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  borderRadius: '16px',
  marginBottom: '2rem',
  position: 'relative',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

interface FormData {
  fullName: string;
  email: string;
  studentId: string;
  branch: string;
  semester: string;
  phoneNumber: string;
  skills: string[];
  areasOfInterest: string[];
  previousProjects: string;
  whyJoinSDC: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  studentId: '',
  branch: '',
  semester: '',
  phoneNumber: '',
  skills: [],
  areasOfInterest: [],
  previousProjects: '',
  whyJoinSDC: '',
};

const branches = [
  'Computer Science',
  'Information Science',
  'Electronics and Communication',
  'Mechanical',
  'Civil',
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [skill, setSkill] = useState('');
  const [interest, setInterest] = useState('');
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    } else if (parseInt(formData.semester) < 1 || parseInt(formData.semester) > 8) {
      newErrors.semester = 'Semester must be between 1 and 8';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits required)';
    }
    if (!formData.whyJoinSDC.trim()) newErrors.whyJoinSDC = 'Please tell us why you want to join SDC';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Registration submitted successfully!' });
        // Clear form after successful submission
        setFormData(initialFormData);
        setSkill('');
        setInterest('');
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Registration failed' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const addSkill = () => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkill('');
    }
  };

  const addInterest = () => {
    if (interest && !formData.areasOfInterest.includes(interest)) {
      setFormData({ ...formData, areasOfInterest: [...formData.areasOfInterest, interest] });
      setInterest('');
    }
  };

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper elevation={3}>
            <ImageContainer>
              <StyledImage
                src="/registration-header.jpg"
                alt="Students Registration"
              />
            </ImageContainer>

            <GradientTypography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              SDC Registration Form
            </GradientTypography>

            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
             
            </Typography>

            <Box sx={{ mb: 4 }}>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                style={{ listStyle: 'none', padding: 0 }}
              >
                {[
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      • {item}
                    </Typography>
                  </motion.li>
                ))}
              </motion.ul>
            </Box>

            <Snackbar
              open={submitStatus !== null}
              autoHideDuration={6000}
              onClose={() => setSubmitStatus(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert 
                severity={submitStatus?.type || 'info'} 
                sx={{ width: '100%' }}
                onClose={() => setSubmitStatus(null)}
              >
                {submitStatus?.message}
              </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    disabled={isLoading}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={isLoading}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    label="Student ID"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    error={!!errors.studentId}
                    helperText={errors.studentId}
                    disabled={isLoading}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    error={!!errors.branch}
                    helperText={errors.branch}
                    disabled={isLoading}
                  >
                    {branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    label="Semester"
                    name="semester"
                    type="number"
                    value={formData.semester}
                    onChange={handleChange}
                    error={!!errors.semester}
                    helperText={errors.semester}
                    inputProps={{ min: 1, max: 8 }}
                    disabled={isLoading}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '47%' } }}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    disabled={isLoading}
                  />
                </Box>

                <Box sx={{ width: '100%' }}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Skills"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      disabled={isLoading}
                    />
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.skills.map((s) => (
                        <StyledChip
                          key={s}
                          label={s}
                          onDelete={() =>
                            setFormData({
                              ...formData,
                              skills: formData.skills.filter((skill) => skill !== s),
                            })
                          }
                          disabled={isLoading}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Areas of Interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                      disabled={isLoading}
                    />
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.areasOfInterest.map((i) => (
                        <StyledChip
                          key={i}
                          label={i}
                          onDelete={() =>
                            setFormData({
                              ...formData,
                              areasOfInterest: formData.areasOfInterest.filter(
                                (interest) => interest !== i
                              ),
                            })
                          }
                          disabled={isLoading}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Previous Projects"
                    name="previousProjects"
                    value={formData.previousProjects}
                    onChange={handleChange}
                    placeholder="Describe your previous projects (if any)"
                    disabled={isLoading}
                  />
                </Box>

                <Box sx={{ width: '100%' }}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Why do you want to join SDC?"
                    name="whyJoinSDC"
                    value={formData.whyJoinSDC}
                    onChange={handleChange}
                    error={!!errors.whyJoinSDC}
                    helperText={errors.whyJoinSDC}
                    disabled={isLoading}
                  />
                </Box>

                <Box sx={{ width: '100%', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      height: 56,
                      position: 'relative',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Submit Registration'
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
          </StyledPaper>
        </motion.div>
      </Container>
    </Fade>
  );
};

export default RegistrationForm; 