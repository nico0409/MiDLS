

export interface AuthState{
    status:'checking'|'authenticated'|'not-authenticated';
    errorMessage:string;

}

type AuthAction=
|{type:'signIn'}
|{type:'addError',payload:string}
|{type:'removeError'}
|{type:'notAuthnticated'}
|{type:'logOut'}

export const authReducer=(state:AuthState,action: AuthAction):AuthState =>{
    
    switch (action.type) {
        case 'addError':
            return{
                ...state,
                status:'not-authenticated',
                errorMessage:action.payload
            };
        case 'removeError':
            return{
                ...state,
                errorMessage:''
            };
        case 'signIn':
          
              return{
                
                 
                 ...state,
                 status:'authenticated',
                 errorMessage:''
             }; 
        case 'logOut':
        case 'notAuthnticated':
             return{
                 ...state,
                 status:'not-authenticated'
                
             };
        default:
           return state
    }

}