"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useStateWithCallback(initialState) {
    const [state, _setState] = react_1.useState(initialState);
    const callbackRef = react_1.useRef();
    const isFirstCallbackCall = react_1.useRef(true);
    const setState = react_1.useCallback((setStateAction, callback) => {
        callbackRef.current = callback;
        _setState(setStateAction);
    }, []);
    react_1.useEffect(() => {
        if (isFirstCallbackCall.current) {
            isFirstCallbackCall.current = false;
            return;
        }
        callbackRef.current?.(state);
    }, [state]);
    return [state, setState];
}
exports.default = useStateWithCallback;
//# sourceMappingURL=useStateWithCallback.js.map