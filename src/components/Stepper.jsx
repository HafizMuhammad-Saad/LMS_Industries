// import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import Stepper from '@mui/material/Stepper';
// // import Step from '@mui/material/Step';
// // import StepLabel from '@mui/material/StepLabel';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';


// const steps = ['Enter Personal Details', 'Select Loan Amount and Terms', 'Review and Submit'];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [skipped, setSkipped] = useState(new Set());
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     loanAmount: '',
//     loanTerm: '',
//   });

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

// //   const isStepSkipped = (step) => {
// //     return skipped.has(step);
// //   };

//   const handleNext = () => {
//     // let newSkipped = skipped;
//     // if (isStepSkipped(activeStep)) {
//     //   newSkipped = new Set(newSkipped.values());
//     //   newSkipped.delete(activeStep);
//     // }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     // setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     // setSkipped((prevSkipped) => {
//     //   const newSkipped = new Set(prevSkipped.values());
//     //   newSkipped.add(activeStep);
//     //   return newSkipped;
//     // });
//   };

//   const handleReset = () => {
//     // setActiveStep(0);
//     setFormData({
//       name: '',
//       email: '',
//       loanAmount: '',
//       loanTerm: '',
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//         //   if (isStepSkipped(index)) {
//         //     stepProps.completed = false;
//         //   }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ mt: 2 }}>
//             {activeStep === 0 && (
//               <Box>
//                 <TextField
//                   label="Full Name"
//                   variant="outlined"
//                   fullWidth
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   sx={{ mb: 2 }}
//                 />
//               </Box>
//             )}
//             {activeStep === 1 && (
//               <Box>
//                 <TextField
//                   label="Loan Amount"
//                   variant="outlined"
//                   fullWidth
//                   name="loanAmount"
//                   value={formData.loanAmount}
//                   onChange={handleChange}
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   label="Loan Term (years)"
//                   variant="outlined"
//                   fullWidth
//                   name="loanTerm"
//                   value={formData.loanTerm}
//                   onChange={handleChange}
//                   sx={{ mb: 2 }}
//                 />
//               </Box>
//             )}
//             {activeStep === 2 && (
//               <Box>
//                 <Typography variant="h6">Review Your Details</Typography>
//                 <Typography>Name: {formData.name}</Typography>
//                 <Typography>Email: {formData.email}</Typography>
//                 <Typography>Loan Amount: {formData.loanAmount}</Typography>
//                 <Typography>Loan Term: {formData.loanTerm} years</Typography>
//               </Box>
//             )}
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             {/* {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )} */}
//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }
import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Typography} from '@mui/material';
import { Modal, Button, Form } from 'react-bootstrap';

export default function LoanFormModal() {
    const [showModal, setShowModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      loanAmount: '',
      loanTerm: '',
    });
  
    // Define steps for the multi-step form
    const steps = ['Personal Details', 'Loan Details', 'Review & Submit'];
  
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Loan Created:', formData);
      handleClose(); // Close the modal after form submission
    };
  
    return (
      <div>
        {/* Button to trigger modal */}
        <Button variant="success" onClick={handleShow}>
          Create new loan
        </Button>
  
        {/* Modal Component */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Loan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Stepper */}
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {/* Step content based on active step */}
                {activeStep === 0 && (
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                )}
  
                {activeStep === 1 && (
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicLoanAmount">
                      <Form.Label>Loan Amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter loan amount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                      />
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="formBasicLoanTerm">
                      <Form.Label>Loan Term (Years)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter loan term in years"
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                )}
  
                {activeStep === 2 && (
                  <div>
                    <Typography variant="h6">Review your information</Typography>
                    <p>Name: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Loan Amount: {formData.loanAmount}</p>
                    <p>Loan Term: {formData.loanTerm} years</p>
                  </div>
                )}
              </div>
            </Box>
          </Modal.Body>
  
          {/* Modal Footer with navigation buttons */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }