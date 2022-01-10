"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_bouncy_checkbox_1 = tslib_1.__importDefault(require("react-native-bouncy-checkbox"));
/**
 * ? Local Imports
 */
const BouncyCheckboxGroup_style_1 = tslib_1.__importDefault(require("./BouncyCheckboxGroup.style"));
const useStateWithCallback_1 = tslib_1.__importDefault(require("./helpers/useStateWithCallback"));
const BouncyCheckboxGroup = ({ style, initial, data, onChange, }) => {
    const [selectedItem, setSelectedItem] = useStateWithCallback_1.default(initial < 4 ? {id: initial} : undefined);
    const handleItemPress = (item) => {

        if (selectedItem === undefined) {
            setSelectedItem(item, (newItem) => onChange && onChange(newItem));
        } else {
            if (selectedItem.id === item.id) {
                setSelectedItem(undefined, () => onChange && onChange(undefined));
            } else {
                setSelectedItem(item, (newItem) => onChange && onChange(newItem));
            }
        }
    };
    return (<react_native_1.View style={[BouncyCheckboxGroup_style_1.default.container, style]}>
        {data &&
            data.map((item) => {
                const isActive = item.id === (selectedItem ? selectedItem?.id : initial);
                return (<react_native_bouncy_checkbox_1.default selectedItem={selectedItem?.id} {...item} disableBuiltInState key={item.id} isChecked={isActive} onPress={() => handleItemPress(item)} />);
            })}
    </react_native_1.View>);
};
exports.default = BouncyCheckboxGroup;
//# sourceMappingURL=BouncyCheckboxGroup.js.map