

// function LoanApplicationStepper() {
//     const steps = [
//       'Borrower Information',
//       'Loan Details',
//       'Collateral',
//       'Review & Submit'
//     ];
  
//     return (
//       <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//         <HorizontalLinearStepper steps={steps}>
//           {/* Step content */}
//           <LoanBorrowerForm />
//           <LoanDetailsForm />
//           <CollateralForm />
//           <ReviewSection />
//         </HorizontalLinearStepper>
//       </Box>
//     );
//   }


import { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@mui/material';

// Placeholder step components (replace with real forms)
function LoanBorrowerForm() {
  return <Typography>Borrower Information Form</Typography>;
}
function LoanDetailsForm() {
  return <Typography>Loan Details Form</Typography>;
}
function CollateralForm() {
  return <Typography>Collateral Form</Typography>;
}
function ReviewSection() {
  return <Typography>Review & Submit Section</Typography>;
}

// Main component
export default function LoanApplicationStepper() {
  const steps = [
    'Borrower Information',
    'Loan Details',
    'Collateral',
    'Review & Submit',
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Step content based on current step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <LoanBorrowerForm />;
      case 1:
        return <LoanDetailsForm />;
      case 2:
        return <CollateralForm />;
      case 3:
        return <ReviewSection />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h6" gutterBottom>
              All steps completed – your application has been submitted!
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}

            <Box sx={{ mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
