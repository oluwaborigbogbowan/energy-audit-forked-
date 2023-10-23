import "./styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from "@mui/material";
import HouseAudit from "./HouseAudit";
import Priority from "./Priority";
import { Helmet } from "react-helmet";

function App() {
  const API_URL = "http://localhost:3500/product";

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        const listProduct = await response.json();
        setMyProduct(listProduct);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItem();
  }, []);

  const [audits, setAudits] = useState([]);
  const [myProduct, setMyProduct] = useState("");
  const [total, setTotal] = useState(0);
  const [myPower, setMyPower] = useState(0);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0c6525", // Change this to your desired primary color
      },
    },
  });

  const steps = ["Step 1", "Step 2"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <HouseAudit
            audits={audits}
            setAudits={setAudits}
            total={total}
            setTotal={setTotal}
            myPower={myPower}
            setMyPower={setMyPower}
          />
        );
      case 1:
        return (
          <Priority
            audits={audits}
            myProduct={myProduct}
            total={total}
            setTotal={setTotal}
            myPower={myPower}
            setMyPower={setMyPower}
          />
        );
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Audit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Other meta tags */}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {getStepContent(activeStep)}
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep !== steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default App;
