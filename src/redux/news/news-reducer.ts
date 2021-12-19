import newsActionTypes, { newsActionType, newsType } from "./new-types";

const { FETCHSUCESS, LOADINGNEWS, ERROR } = newsActionTypes;
export interface hashedNewType { [key: string]: newsType[] };
export interface newsReducerState {
    list: newsType[],
    hashed: hashedNewType,
    isLoading: boolean,
    isErrored: boolean,
};

const INITIAL_STATE: newsReducerState = {
    list: [],
    hashed: {},
    isLoading: false,
    isErrored: false,
};

const newsReducer = (state = INITIAL_STATE, action: newsActionType) => {

    switch (action.type) {
        case FETCHSUCESS:
            const hashedValue: hashedNewType = {};
            const { payload } = action;
            if (Array.isArray(payload)) {
                payload.forEach(item => {
                    if (!hashedValue[item.PUBLISHER]) {
                        hashedValue[item.PUBLISHER] = [item];
                    }
                    else {
                        hashedValue[item.PUBLISHER].push(item);
                    }
                })
                return {
                    ...state,
                    list: payload,
                    hashed: hashedValue,
                    isLoading: false,
                    isErrored: false,
                };
            }
            return { ...state };

        case LOADINGNEWS:
            return {
                ...state,
                isLoading: true,
            };

        case ERROR:
            return {
                ...state,
                isErrored: true,
            }

        default: return { ...state };
    }
}

export default newsReducer;