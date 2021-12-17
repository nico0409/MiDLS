"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_spinkit_1 = tslib_1.__importDefault(require("react-native-spinkit"));
/**
 * ? Local Imports
 */
const Icon_1 = tslib_1.__importDefault(require("./components/Icon"));
const RNSingleSelect_style_1 = tslib_1.__importStar(require("./RNSingleSelect.style"));
const theme_1 = require("./theme");
const RNSingleSelect = (props) => {
    let iconRef = undefined;
    const { data, width, height, value, darkMode, onSelect, placeholder, onTextChange, arrowImageStyle, animatedBorderRadius, placeholderTextColor, buttonContainerStyle, placeholderTextStyle, menuBarContainerStyle, menuBarContainerHeight = 150, menuBarContainerWidth = 250, disableAbsolute = false, ImageComponent = react_native_1.Image, TextComponent = react_native_1.Text, disableFilterAnimation = false, spinnerType = "ThreeBounce", spinnerSize = 30, spinnerColor, initialValue = null, searchEnabled = true, scrollViewRef } = props;
    const [selectedItem, setSelectedItem] = React.useState(initialValue);
    const [placeholderText, setPlaceholderText] = React.useState(placeholder);
    const [menuToggled, setMenuToggled] = React.useState(false);
    const [dataBackup, setDataBackup] = React.useState(data);
    const [dataSource, setDataSource] = React.useState(data);
    const [borderRadiusAnimation, setBorderRadiusAnimation] = React.useState(new react_native_1.Animated.Value(animatedBorderRadius || 16));
    const [menuBarYTranslateAnimation, setMenuBarYTranslateAnimation] = React.useState(new react_native_1.Animated.Value(0));
    const [theme, setTheme] = React.useState(theme_1.DARK);

    const { height: windowHeight } = react_native_1.useWindowDimensions();

    React.useEffect(() => {
        if (darkMode)
            setTheme(theme_1.DARK);
        else
            setTheme(theme_1.LIGHT);
    }, []);
    React.useEffect(() => {
        setDataSource(data);
        setDataBackup(data);
        setSelectedItem(initialValue);
        setPlaceholderText(placeholder);
    }, [data]);
    const animateBorderRadius = () => {
        react_native_1.Animated.timing(borderRadiusAnimation, {
            toValue: menuToggled ? animatedBorderRadius || 16 : 0,
            duration: 1250,
            easing: react_native_1.Easing.bounce,
            useNativeDriver: true,
        }).start();
    };
    const animateSelectionBar = () => {
        react_native_1.Animated.timing(menuBarYTranslateAnimation, {
            toValue: menuToggled ? 0 : 100,
            duration: 250,
            easing: react_native_1.Easing.ease,
            useNativeDriver: true,
        }).start();
    };
    const handleOnToggleMenuBar = (isMenuToggled) => {
        iconRef?.onPressAnimation();
        animateBorderRadius();
        animateSelectionBar();
        setMenuToggled(isMenuToggled ? isMenuToggled : !menuToggled);
    };
    const handleOnSelectItem = (item) => {
        handleOnFilter("");
        setSelectedItem(item);
        handleOnToggleMenuBar();
        onSelect && onSelect(item);
    };
    const triggerFilterAnimation = () => {
        react_native_1.LayoutAnimation.configureNext({
            duration: 1000,
            create: {
                type: react_native_1.LayoutAnimation.Types.spring,
                property: react_native_1.LayoutAnimation.Properties.opacity,
                springDamping: 1,
            },
            delete: {
                type: react_native_1.LayoutAnimation.Types.spring,
                property: react_native_1.LayoutAnimation.Properties.opacity,
                springDamping: 1,
            },
        });
    };
    const handleOnFilter = (text) => {
        let newData = dataBackup;
        newData = dataBackup?.filter((item) => {
            const itemData = item.value.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        !disableFilterAnimation && triggerFilterAnimation();
        setDataSource(newData);
        setSelectedItem({ value: text });
        setDataSource(newData);
    };
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */
    const renderTextInput = () => (<react_native_1.TextInput {...props} value={value} editable={searchEnabled} placeholderTextColor={placeholderTextColor
        ? placeholderTextColor
        : selectedItem
            ? theme_1.ThemeColors[theme].textColor
            : theme_1.ThemeColors[theme].placeholderColor} style={[RNSingleSelect_style_1._placeholderTextStyle(theme, selectedItem), placeholderTextStyle]} placeholder={placeholderText || "Select"} onFocus={() => handleOnToggleMenuBar(false)} onChangeText={(text) => {
                if (text.length === 0)
                    handleOnFilter("");
                else
                    handleOnFilter(text);
                onTextChange && onTextChange(text);
            }}>
        <TextComponent>{selectedItem?.value}</TextComponent>
    </react_native_1.TextInput>);
    const renderReadOnlyMode = () => (<react_native_1.Text style={[
        RNSingleSelect_style_1._placeholderTextStyle(theme, selectedItem, placeholderTextColor),
        placeholderTextStyle,
    ]}>
        {selectedItem ? selectedItem?.value : placeholderText || "Select"}
    </react_native_1.Text>);
    const renderSingleSelectButton = () => {
        return (<react_native_1.TouchableOpacity {...props} onPress={() => {
            handleOnToggleMenuBar();
            setTimeout(() => {
                scrollViewRef?.current?.scrollTo({ y: placeholder === 'Turno' ? windowHeight * 0.4 : windowHeight, animated: true });   
            }, 200);
           
        }}>
            <react_native_1.Animated.View style={[
                RNSingleSelect_style_1._menuButtonContainer(theme, height, width),
                {
                    borderRadius: borderRadiusAnimation,
                },
                buttonContainerStyle,
            ]}>
                <react_native_1.View style={RNSingleSelect_style_1.default.buttonContainerGlue}>
                    {searchEnabled ? renderTextInput() : renderReadOnlyMode()}
                    <Icon_1.default theme={theme} ref={(ref) => (iconRef = ref)} style={[RNSingleSelect_style_1.default.arrowImageStyle, arrowImageStyle]} {...props} />
                </react_native_1.View>
            </react_native_1.Animated.View>
        </react_native_1.TouchableOpacity>);
    };
    const renderMenuItem = (index, menuItem) => {
        const { id, value, imageSource } = menuItem;
        const { data, imageWidth, imageHeight, menuItemTextStyle } = props;
        return (<react_native_1.TouchableHighlight key={id} style={RNSingleSelect_style_1._menuItemContainer(index, data)} onPress={() => {
            handleOnSelectItem(menuItem);
        }}>
            <react_native_1.View style={RNSingleSelect_style_1.default.menuBarItemContainerGlue}>
                {imageSource && (<ImageComponent resizeMode="contain" source={imageSource} style={RNSingleSelect_style_1._imageStyle(imageHeight, imageWidth)} />)}
                <TextComponent style={[RNSingleSelect_style_1._menuItemTextStyle(theme), menuItemTextStyle]}>
                    {value}
                </TextComponent>
            </react_native_1.View>
        </react_native_1.TouchableHighlight>);
    };
    const renderSpinner = () => (<react_native_1.View style={RNSingleSelect_style_1.default.spinnerContainer}>
        <react_native_spinkit_1.default size={spinnerSize} type={spinnerType} color={spinnerColor || theme_1.ThemeColors[theme].textColor} isVisible={!(dataSource && dataSource.length > 0)} />
    </react_native_1.View>);
    const renderList = () => (<react_native_1.ScrollView nestedScrollEnabled style={RNSingleSelect_style_1.default.listStyle}>
        {dataSource &&
            dataSource.map((item, index) => {
                return renderMenuItem(index, item);
            })}
    </react_native_1.ScrollView>);
    const renderMenuBar = () => {
        const rotate = menuBarYTranslateAnimation.interpolate({
            inputRange: [0, 25, 50, 75, 100],
            outputRange: [0, 0.5, 0.75, 0.9, 1],
        });
        return (<react_native_1.Animated.View style={[
            RNSingleSelect_style_1._menuBarContainer(theme, menuBarContainerHeight, menuBarContainerWidth),
            {
                transform: [{ scaleY: rotate }],
                display: disableAbsolute ? "flex" : menuToggled ? "flex" : "none",
            },
            menuBarContainerStyle,
        ]}>
            {dataSource && dataSource.length > 0 ? renderList() : renderSpinner()}
        </react_native_1.Animated.View>);
    };
    return (<react_native_1.View>
        {renderSingleSelectButton()}
        {renderMenuBar()}
    </react_native_1.View>);
};
exports.default = RNSingleSelect;
//# sourceMappingURL=RNSingleSelect.js.map