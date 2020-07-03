
//                         cm   kg
//console.log(calculateBmi(180, 74)) //Normal (healthy weight)

const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || height === 0) {
    throw new Error('incorrect height');
  }
  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 18.5) {
    return 'Underweight (unhealty weight)'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight (unhealty weight)'
  } else {
    return 'Obese (unhealty weight)'
  }
}

console.log(calculateBmi(180, 74)) //Normal (healthy weight)