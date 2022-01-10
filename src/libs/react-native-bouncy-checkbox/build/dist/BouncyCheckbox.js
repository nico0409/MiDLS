"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const react_native_1 = require("react-native");
const BouncyCheckbox_style_1 = (0, tslib_1.__importStar)(require("./BouncyCheckbox.style"));
const defaultCheckImage = require("./check.png");
class BouncyCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            springValue: new react_native_1.Animated.Value(1),
        };
    }
    componentDidMount() {
        this.setState({ checked: this.props.isChecked || false });
    }
    onPress = () => {
        const { disableBuiltInState = false, useNativeDriver = true, bounceEffect = 1, bounceFriction = 3, id, selectedItem } = this.props;
        const { checked, springValue } = this.state;
        if (!disableBuiltInState) {
            this.setState({ checked: !checked }, () => {
                springValue.setValue(0.7);
                react_native_1.Animated.spring(springValue, {
                    toValue: bounceEffect,
                    friction: bounceFriction,
                    useNativeDriver,
                }).start();
                this.props.onPress && this.props.onPress(this.state.checked);
            });
        }
        else {
            id !== selectedItem &&
                springValue.setValue(0.7);
            react_native_1.Animated.spring(springValue, {
                toValue: bounceEffect,
                friction: bounceFriction,
                useNativeDriver,
            }).start();
            this.props.onPress && this.props.onPress(this.state.checked);
        }
    };
    renderCheckIcon = () => {
        const { checked, springValue } = this.state;
        const { size = 25, iconStyle, iconComponent, iconImageStyle, fillColor = "#ffc484", ImageComponent = react_native_1.Image, unfillColor = "transparent", disableBuiltInState, isChecked, checkIconImageSource = defaultCheckImage, } = this.props;
        const checkStatus = disableBuiltInState ? isChecked : checked;
        return (<react_native_1.Animated.View style={[
            //{ transform: [{ scale: springValue }] },
            (0, BouncyCheckbox_style_1._iconContainer)(size, checkStatus, fillColor, unfillColor),
            iconStyle,
        ]}>
            {iconComponent ||
                (checkStatus && (<ImageComponent source={checkIconImageSource} style={[BouncyCheckbox_style_1.default.iconImageStyle, iconImageStyle]} />))}
        </react_native_1.Animated.View>);
    };
    renderCheckboxText = () => {
        const { text, isChecked, textStyle, textContainerStyle, disableBuiltInState, disableText = false, } = this.props;
        const { checked } = this.state;
        return (!disableText && (<react_native_1.View style={[BouncyCheckbox_style_1.default.textContainer, textContainerStyle]}>
            <react_native_1.Text style={[
                (0, BouncyCheckbox_style_1._textStyle)(disableBuiltInState ? isChecked : checked),
                textStyle,
            ]}>
                {text}
            </react_native_1.Text>
        </react_native_1.View>));
    };
    render() {
        const { style, TouchableComponent = react_native_1.TouchableOpacity } = this.props;
        return (<TouchableComponent {...this.props} style={[BouncyCheckbox_style_1.default.container, style]} 
        onPress={this.onPress}
        >
            {this.renderCheckIcon()}
            {this.renderCheckboxText()}
        </TouchableComponent>);
    }
}
exports.default = BouncyCheckbox;
//# sourceMappingURL=BouncyCheckbox.js.map