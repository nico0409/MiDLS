"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._textStyle = exports._iconContainer = void 0;
const react_native_1 = require("react-native");
const _iconContainer = (size, checked, fillColor, unfillColor) => {
    return {
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: fillColor,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: checked ? fillColor : unfillColor,
    };
};
exports._iconContainer = _iconContainer;
const _textStyle = (checked) => {
    return {
        fontSize: 16,
        color: "#757575",
        textDecorationLine: checked ? "line-through" : "none",
    };
};
exports._textStyle = _textStyle;
exports.default = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
    },
    iconImageStyle: {
        width: 10,
        height: 10,
    },
    textContainer: {
        marginLeft: 16,
    },
});
//# sourceMappingURL=BouncyCheckbox.style.js.map