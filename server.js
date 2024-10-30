const express = require("express");
const bodyParser = require("body-parser");  
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

// Function to calculate BMI
function calculateBMI(weightKg, heightCm) {
  if (heightCm <= 0) {
      throw new Error("Height must be greater than zero.");
  }
  const heightM = heightCm / 100; // Convert cm to meters
  return weightKg / (heightM * heightM);
}

// Function to determine BMI category
function getBMICategory(bmi) {
  if (bmi < 18.5) {
      return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
      return "Optimum range";
  } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
      return "Class I obesity";
  } else if (bmi >= 35 && bmi < 40) {
      return "Class II obesity";
  } else {
      return "Class III obesity";
  }
}

app.post("/bmicalculator", (req, res) => {
  const { weight, height } = req.body;
  try {
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);
    res.send(`Your BMI is ${bmi} and you are in the ${category} category.`);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});