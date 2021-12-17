"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._menuItemTextStyle = exports._imageStyle = exports._menuButtonContainer = exports._menuBarContainer = exports._menuItemContainer = exports._placeholderTextStyle = void 0;
const react_native_1 = require("react-native");
const theme_1 = require("./theme");
exports._placeholderTextStyle = (theme, selectedItem, placeholderTextColor) => ({
    width: "90%",
    fontSize: 16,
    fontWeight: "bold",
    color: placeholderTextColor
        ? placeholderTextColor
        : selectedItem
            ? theme_1.ThemeColors[theme].textColor
            : theme_1.ThemeColors[theme].placeholderColor,
});
exports._menuItemContainer = (index, data) => ({
    padding: 16,
    borderBottomEndRadius: index === (data && data.length - 1) ? 16 : 0,
    borderBottomStartRadius: index === (data && data.length - 1) ? 16 : 0,
});
exports._menuBarContainer = (theme, menuBarContainerHeight, menuBarContainerWidth) => ({
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    height: menuBarContainerHeight,
    width: menuBarContainerWidth,
    backgroundColor: theme_1.ThemeColors[theme].menuBarBackgroundColor,
});
exports._menuButtonContainer = (theme, height = 50, width = 250) => ({
    width,
    height,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
    backgroundColor: theme_1.ThemeColors[theme].menuButtonBackgroundColor,
});
exports._imageStyle = (height = 25, width = 25) => ({
    width,
    height,
    marginRight: 16,
});
exports._menuItemTextStyle = (theme) => ({
    color: theme_1.ThemeColors[theme].menuItemTextColor,
    fontWeight: "700",
});
exports.default = react_native_1.StyleSheet.create({
    buttonContainerGlue: {
        marginLeft: 16,
        marginRight: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    arrowImageStyle: {
        width: 20,
        height: 20,
    },
    menuBarItemContainerGlue: {
        flexDirection: "row",
        alignItems: "center",
    },
    listStyle: {
        marginTop: 3,
        marginBottom: 3,
    },
    spinnerContainer: {
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
    },
});
//# sourceMappingURL=RNSingleSelect.style.js.map