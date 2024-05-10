"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOptional = void 0;
const class_validator_1 = require("class-validator");
function IsOptional(validationOptions) {
    return (0, class_validator_1.ValidateIf)((_, value) => {
        return value !== undefined;
    }, validationOptions);
}
exports.IsOptional = IsOptional;
//# sourceMappingURL=is-optional.decorator.js.map