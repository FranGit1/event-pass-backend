import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

const stream = {
  write: (message) => {
    const trimmedMessage = message ? message.trim() : 'Unable to trim http logger message.';
    Logger.log(trimmedMessage);
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
morgan.token('body', (req, res) => JSON.stringify(req.body));

const httpLogger = morgan(':method :url :body :status - :response-time ms', {
  stream
});

export default httpLogger;
