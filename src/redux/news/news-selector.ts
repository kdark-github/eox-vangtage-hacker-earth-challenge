import { createSelector } from 'reselect';
import { RootState } from '../store';
import { newsType } from './new-types';
import { newsReducerState } from './news-reducer';

const newsState = (state: RootState) => state.news;

export const newsList = createSelector(
    [newsState],
    (state: newsReducerState) => state.list,
);

export const isNewsLoading = createSelector(
    [newsState],
    (state: newsReducerState) => state.isLoading,
)
export const newsObject = createSelector(
    [newsState],
    (state: newsReducerState) => state.hashed,
);


export const selectPublisherNews = (publisher: string) => createSelector(
    [newsObject],
    newsObject => (newsObject[publisher] ? newsObject[publisher] : null)
);

// export const searchNews = (searchString: string) => createSelector(
//     [newsList],
//     (list) => {
//         const publishers: newsType[] = [];
//         const news: newsType[] = [];

//         if (searchString === '') return null;
//         list.forEach((newsItem) => {
//             const { PUBLISHER, TITLE } = newsItem;
//             if (PUBLISHER.includes(searchString)) publishers.push(newsItem);
//             if (TITLE.includes(searchString)) news.push(newsItem);
//         })

//         publishers.sort((prev, next) => prev.TIMESTAMP - next.TIMESTAMP)
//         news.sort((prev, next) => prev.TIMESTAMP - next.TIMESTAMP)

//         return {
//             publishers,
//             news,
//         }

//     },
// )