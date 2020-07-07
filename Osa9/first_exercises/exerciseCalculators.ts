interface Values {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

interface ExerciseData {
  target: number;
  days: Array<number>
}
const parseArgsValues = (args: Array<string>): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [target, ...data] = args.slice(2);
  const days = data.map(d => {
    if (isNaN(Number(d))) throw new Error('training data is not a number!');
    return Number(d);
  });
  if (isNaN(Number(target))) throw new Error('Target is not a number!');

  return {
    target: Number(target),
    days
  };
};

const calculateRating = (a: number, t: number): number => {
  if (a < t) return 1;
  if (a === t) return 2;
  return 3;
};

const calculateRatingDescription = (r: number): string => {
  if (r === 1) return 'heikkoa toimintaa';
  if (r === 2) return 'pystyy parempaan';
  return 'hmmm... ihan ok';
};

const calculateExercises = (daily: Array<number>, target: number): Values => {
  const periodLength = daily.length;
  if (periodLength === 0) {
    throw new Error('No exercises');
  }
  const trainingDays = daily.filter(n => n !== 0).length;
  const average = daily.reduce((a, c) => a + c) / periodLength;
  const success = average > target || average === target;
  const rating: number = calculateRating(average, target);
  const ratingDescription: string = calculateRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, days } = parseArgsValues(process.argv);
  console.log(calculateExercises(days, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('error message: ', e.message);
  } else {
    throw e;
  }

}