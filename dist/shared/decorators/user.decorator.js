"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserIdParam = void 0;
const common_1 = require("@nestjs/common");
exports.AuthUserIdParam = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.id;
});
//# sourceMappingURL=user.decorator.js.map