const dateTimeTransformer = {
  parseValue(dateTime: string) {
    return new Date(dateTime);
  },

  serialize(date: Date) {
    return date
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
};

export const transformers = {
  Game: {
    start: dateTimeTransformer,
    stop: dateTimeTransformer
  },

  Shot: {
    time: dateTimeTransformer
  },

  Pass: {
    time: dateTimeTransformer
  },

  Intercept: {
    time: dateTimeTransformer
  },

  Player: {
    dob: dateTimeTransformer
  },

  ActionCount: {
    time: dateTimeTransformer
  },

  TeamShotCountByPeriod: {
    start: dateTimeTransformer,
    stop: dateTimeTransformer
  }
};
