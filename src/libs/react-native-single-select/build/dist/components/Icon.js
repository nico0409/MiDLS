"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
/**
 * ? Local Imports
 */
const theme_1 = require("../theme");
// ? Assets
const down_arrow_light_png_1 = tslib_1.__importDefault(require("./down-arrow-light.png"));
const down_arrow_dark_png_1 = tslib_1.__importDefault(require("./down-arrow-dark.png"));
class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.onPressAnimation = () => {
            const { rotation, toggled } = this.state;
            react_native_1.Animated.timing(rotation, {
                toValue: toggled ? 0 : 1,
                duration: 850,
                easing: react_native_1.Easing.bounce,
                useNativeDriver: true,
            }).start(() => this.setState({ toggled: !this.state.toggled }));
        };
        this.state = {
            toggled: false,
            rotation: new react_native_1.Animated.Value(0),
        };
    }
    render() {
        const { style, iconImageSource, ...other } = this.props;
        const rotate = this.state.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
        });
        return (<react_native_1.Animated.Image {...other} source={iconImageSource ||
            (this.props.theme === theme_1.DARK
                ? down_arrow_light_png_1.default
                : down_arrow_dark_png_1.default)} style={[style, { transform: [{ rotate }] }]}/>);
    }
}
exports.default = Icon;
//# sourceMappingURL=Icon.js.map