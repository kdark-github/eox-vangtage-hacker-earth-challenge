import newsActionTypes, { newsType } from "./new-types";

const { FETCHSUCESS, LOADINGNEWS, ERROR } = newsActionTypes;


export const fetchNewsStart = () => ({
    type: LOADINGNEWS,
    payload: true,
})

export const fetchNewsSuccess = (list: newsType[]) => ({
    type: FETCHSUCESS,
    payload: list
})


export const fetchNewsFailure = () => ({
    type: ERROR,
    payload: true,

});

