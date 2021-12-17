import { SetStateAction } from 'react';
declare type Callback<T> = (value?: any) => void;
declare type DispatchWithCallback<T> = (value: any, callback?: Callback<any>) => void;
declare function useStateWithCallback<T>(initialState: any | (() => any)): [any, DispatchWithCallback<SetStateAction<any>>];
export default useStateWithCallback;
