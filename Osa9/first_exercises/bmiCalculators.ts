interface BmiData {
  height: number;
  weight: number;
}
const parseArgsData = (args: Array<string>): BmiData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) === 0) {
      throw new Error('Height is invalid!');
    }
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight (unhealty weight)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (unhealty weight)';
  } else {
    return 'Obese (unhealty weight)';
  }
};
/*
try {
  const { height, weight } = parseArgsData(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (e) {
  if (e instanceof Error) {
    console.error('Error, something went wrong, message: ', e.message);
  } else {
    throw e;
  }
}
*/
//console.log(calculateBmi(180, 74)) //Normal (healthy weight)
try {
  parseArgsData(process.argv);
} catch (e) {
//
}