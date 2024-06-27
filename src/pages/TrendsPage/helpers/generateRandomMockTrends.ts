const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const generateRandomMockTrends = (numDays: number) => {
  const mockTrends = [];
  const currentDate = new Date();

  for (let i = 0; i < numDays; i++) {
    const randomTrend = {
      SiO2: generateRandomNumber(2, 5),
      Na2O: generateRandomNumber(2, 5),
      MgO: generateRandomNumber(2, 5),
      Fe2O3: generateRandomNumber(0, 5),
      Al2O3: generateRandomNumber(0, 5),
      CaO: generateRandomNumber(0, 15),
      K2O: generateRandomNumber(0, 5),
      SO3: generateRandomNumber(0, 10),
      Clo: generateRandomNumber(0, 10),
      humidity: generateRandomNumber(0, 1),
      time: currentDate.toISOString(),
    };
    mockTrends.push(randomTrend);
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return mockTrends;
};
