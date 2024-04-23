/**
 * Class Multiple inheritance
 * @param {Constructor} BaseClass      - Parent Classes
 * @returns Constructor
 */
/*
Usage:

class BaseClass { }
const GrpcService = multipleClasses(ExtensionOne, ExtensionTwo)(BaseClass);

export default new GrpcService;

*/
function multipleClasses(...mixins) {
    return function (Base) {
        const copyProps = (target, source) => {
            Object.getOwnPropertyNames(source)
                .concat(Object.getOwnPropertySymbols(source))
                .forEach((prop) => {
                    if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
                        return;
                    }
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
                });
        };
        mixins.forEach((mixin) => {
            copyProps(Base, mixin);
            copyProps(Base.prototype, mixin.prototype);
        });
        return Base;
    }
}

export {
    multipleClasses
}