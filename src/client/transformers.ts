const DateTimeTransformer = {
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
  /* Entities */
  Game: {
    start: DateTimeTransformer,
    stop: DateTimeTransformer
  },

  Shot: {
    time: DateTimeTransformer
  },

  Pass: {
    time: DateTimeTransformer
  },

  Intercept: {
    time: DateTimeTransformer
  },

  Player: {
    dob: DateTimeTransformer
  },

  /* Object Types */
  ActionCount: {
    time: DateTimeTransformer
  },

  TeamShotCountByPeriod: {
    start: DateTimeTransformer,
    stop: DateTimeTransformer
  }
};
