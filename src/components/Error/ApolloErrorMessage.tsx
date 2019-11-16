import { ApolloError } from "apollo-client";
import * as React from "react";

import Card, { CardColumn, CardSection } from "../Card";

type Props = {
  file: string;
  error: ApolloError;
  message: string;
};

const ApolloErrorMessage: React.FC<Props> = ({ error, message, file }) => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="error">
        <p className="error__body">{message}</p>
        <div className="error__info">
          <p>{file}</p>
          {error.networkError && <p>{error.networkError.name}</p>}
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardSection padding={[2, 1]}>
        <CardColumn>
          <h5>🤭</h5>
          <p>{message}</p>
        </CardColumn>
      </CardSection>
    </Card>
  );
};

export default ApolloErrorMessage;
