import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (cart.id) {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});

                // console.log(token);

                setCheckoutToken(token);
            } catch {
                // console.log(error);
                // history.pushState('/');
                if (activeStep !== steps.length) history.push('/');
            }
        };

        generateToken();
    }
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const test = (data) => {
        setShippingData(data);

        nextStep();
    };

    // const timeout = () => {
    //     setTimeout(() => {
    //         setIsFinished(true)
    //     }, 3000);
    // }

    let Confirmation = () => (order.customer ? (
        <>
            <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if(error) {
        Confirmation = () => (
        <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
        );
    }

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}  />);

    return (
        <>
        <CssBaseline />
           <div className={classes.toolbar} />
                <main className={classes.layout}>
                   <Paper className={classes.paper}>
                       <Typography variant="h4" align="center">Checkout</Typography>
                       <Stepper activeStep className={classes.stepper}>
                           {steps.map((label) => (
                               <Step key={label}>
                                   <StepLabel>{label}</StepLabel>
                               </Step>
                           ))}
                       </Stepper>
                       {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                    </Paper> 
                </main> 
        </>
    );
};

export default Checkout;
