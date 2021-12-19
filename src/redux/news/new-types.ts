const newsActionTypes = {
    FETCHSUCESS: 'FETCHSUCESS',
    LOADINGNEWS: 'LOADINGNEWS',
    ERROR: 'ERROR',
};

export default newsActionTypes;

export interface newsType {
    ID: number,
    TITLE: string,
    URL: string,
    PUBLISHER: string,
    CATEGORY: string,
    HOSTNAME: string,
    TIMESTAMP: number
}

export interface newsActionType {
    payload?: newsType[],
    type: string,
}