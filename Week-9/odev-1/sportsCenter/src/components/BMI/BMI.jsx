import React, {useState} from "react";

const BMI = () =>{
    const [bmi, setBMI] = useState(null);
    const [percentage, setPercentage] = useState(6);

    const handleBMIChange = (e) =>{
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);

        if(weight && height){
            const bmiValue = weight / ((height/100) ** 2);
            setBMI(bmiValue.toFixed(1));

            let calculatedPercentage = 6;
            if(bmiValue > 13.5 && bmiValue < 18.5){
                calculatedPercentage = 7 + (bmiValue - 13.5) * 16 / 5;
            } else if (bmiValue > 25 && bmiValue < 30 || bmiValue >= 30 && bmiValue < 35 || bmiValue >= 35 && bmiValue < 40) {
                calculatedPercentage = 40 + (bmiValue - 24.5) * 16 / 5;
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                calculatedPercentage = 23 + (bmiValue - 18.5) * 16 / 7;
            }

            setPercentage(calculatedPercentage > 6 && calculatedPercentage < 88 ? calculatedPercentage:6);
        }
    };

    return(
        <div className="bmi-container">
            <div className="calculate-container">
                <h1>BMI Calculator</h1>
                <p>
                    A higher BMI increases the chance of developing long-term conditions,
                    such as type 2 diabetes and heart disease.The BMI calculation is just
                    one measure of health.<br /><br />
                    It cannot tell the difference between muscle and fat. For example, if
                    you have a lot of muscle, you may be classed as overweight or obese
                    despite having low body fat.This is why you may get a better idea of
                    your overall health from measuring your waist.
                </p>
                <input id="height" type="text" placeholder="Your Height" onChange={handleBMIChange} />
                <input id="weight" type="text" placeholder="Your Weight" onChange={handleBMIChange} />
            </div>
            <div className="img-container">
                <h4>Your BMI: {bmi || "Enter values to calculate"}</h4>
                <img src="./images/bmi-index.jpg" alt="BMI Index" />
                <div className="triangle" style={{left: `${percentage}%`}}></div>
            </div>
        </div>
    );
};

export default BMI;