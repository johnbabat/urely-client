import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'

export const initialState = {
    user: null
};

export interface User { 
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

type typeState = {
    user: User | null
}

export type ActionType = { type:'LOGIN'; payload: User } | {type:'LOGOUT'}

const reducer = (state : typeState, action: ActionType) => {

    switch(action.type) {
        case 'LOGIN':
            console.log( 'login payload', action.payload)
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            console.log('logout no payload')
            return {
                user: null
            }
        default:
            return state;
    }
}

export default reducer;


export const DataLayerContext = createContext<[typeState, Dispatch<any>]>([initialState, () => {}]);

export const DataLayer = ({ initialState, reducer, children }: { initialState: typeState, reducer: (state: typeState, action: ActionType) => typeState, children: ReactNode }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
    )

export const useDataLayerValue = () => useContext(DataLayerContext);