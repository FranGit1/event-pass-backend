"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateColumn = exports.JSONColumn = exports.EnumColumn = exports.DoubleColumn = exports.BooleanColumn = exports.TextColumn = exports.IntegerColumn = void 0;
const typeorm_1 = require("typeorm");
const IntegerColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'integer' }, options));
exports.IntegerColumn = IntegerColumn;
const TextColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'text' }, options));
exports.TextColumn = TextColumn;
const BooleanColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'boolean' }, options));
exports.BooleanColumn = BooleanColumn;
const DoubleColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'double precision' }, options));
exports.DoubleColumn = DoubleColumn;
const EnumColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'enum' }, options));
exports.EnumColumn = EnumColumn;
const JSONColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'jsonb' }, options));
exports.JSONColumn = JSONColumn;
const DateColumn = (options) => (0, typeorm_1.Column)(Object.assign({ type: 'timestamptz' }, options));
exports.DateColumn = DateColumn;
//# sourceMappingURL=columns.js.map