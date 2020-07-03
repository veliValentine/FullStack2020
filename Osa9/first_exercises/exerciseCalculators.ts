
interface Values {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const f = (a: number, t: number): Array<any> => {
  if (a < t) {
    return [1, 'heikkoa toimintaa']
  } else if (a === t) {
    return [2, 'odotusten mukaista']
  } else {
    return [3, 'hmmm... ihan hyvä']
  }
}

const calculateExercises = (daily: Array<number>, target: number): Values => {
  const periodLength = daily.length
  if (periodLength === 0) {
    throw new Error('No exercises');
  }
  const trainingDays = daily.filter(n => n !== 0).length
  const average = daily.reduce((a, c) => a + c) / periodLength
  const success = average > target || average === target
  const [rating, ratingDescription] = f(average, target)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}
try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e) {
  console.log('error message: ', e.message);
}
try {
  console.log(calculateExercises([3], 2));
} catch (e) {
  console.log('error message: ', e.message);
}
try {
  console.log(calculateExercises([], 2));
} catch (e) {
  console.log('error message: ', e.message);
}
