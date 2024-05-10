"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const stream = {
    write: (message) => {
        const trimmedMessage = message ? message.trim() : 'Unable to trim http logger message.';
        common_1.Logger.log(trimmedMessage);
    }
};
morgan.token('body', (req, res) => JSON.stringify(req.body));
const httpLogger = morgan(':method :url :body :status - :response-time ms', {
    stream
});
exports.default = httpLogger;
//# sourceMappingURL=http.logger.js.map