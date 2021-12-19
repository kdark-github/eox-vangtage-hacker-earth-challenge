import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { newsType } from '../../redux/news/new-types';
import { selectPublisherNews } from '../../redux/news/news-selector';
import { RootState } from '../../redux/store';
import moment from 'moment';
import styles from './publisher.module.css';

interface PublisherProps extends RouteComponentProps<{ publisherName: string }> {
    newsList?: newsType[] | null,
}

const Publisher: React.FunctionComponent<PublisherProps> = ({
    match,
    newsList,
}) => {

    const { params: {
        publisherName,
    } } = match;

    const [newsState, setNewsState] = React.useState<newsType[]>([]);

    React.useEffect(() => {
        if (Array.isArray(newsList)) {
            const tempList = [...newsList];
            tempList.sort((prev, next) => next.TIMESTAMP - prev.TIMESTAMP)
            setNewsState(tempList)
        }
    }, [newsList]);

    return (
        <>
            <h1 style={{marginTop: '100px', textAlign:'center'}}>{publisherName}</h1>

            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>
                            News Title
                        </th>
                        <th>
                            Published on
                        </th>
                    </tr>
                    {
                        newsState.map(news => {
                            return (
                                <tr key={news.ID}>
                                    <td>
                                        {news.TITLE}
                                    </td>
                                    <td>
                                        {moment(news.TIMESTAMP).format('DD/MM/YYYY')}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    );
};


const mapStateToProps = (state: RootState, ownProps: PublisherProps) => ({
    newsList: selectPublisherNews(ownProps.match.params.publisherName)(state)
})

export default connect(mapStateToProps)(Publisher);
