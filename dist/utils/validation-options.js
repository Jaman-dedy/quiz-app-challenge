"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function generateErrors(errors) {
    return errors.reduce((accumulator, currentValue) => {
        var _a, _b, _c, _d;
        return (Object.assign(Object.assign({}, accumulator), { [currentValue.property]: ((_b = (_a = currentValue.children) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0
                ? generateErrors((_c = currentValue.children) !== null && _c !== void 0 ? _c : [])
                : Object.values((_d = currentValue.constraints) !== null && _d !== void 0 ? _d : {}).join(', ') }));
    }, {});
}
const validationOptions = {
    transform: true,
    whitelist: true,
    errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: (errors) => {
        return new common_1.HttpException({
            status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            errors: generateErrors(errors),
        }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    },
};
exports.default = validationOptions;
//# sourceMappingURL=validation-options.js.map