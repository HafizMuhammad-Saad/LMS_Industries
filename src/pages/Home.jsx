import * as React from 'react';
import { Link } from 'react-router';
// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-4xl font-bold">Welcome to the LMS </h1>
      <p className="mt-4 text-lg">Loan Management Syestem.</p>
      <p className="mt-4 text-lg">Please <Button variant='success'> <Link to={'./authsignin'}>Login</Link> </Button> to continue.</p>
      
    </div>
  );
}