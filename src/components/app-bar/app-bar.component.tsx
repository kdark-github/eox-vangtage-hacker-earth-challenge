import * as React from 'react';
import styles from './app-bar.module.css';
import { newsType } from '../../redux/news/new-types';
import { connect } from 'react-redux';
import { newsList } from '../../redux/news/news-selector';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';



const TopBar: React.FunctionComponent<{ newsList?: newsType[] }> = ({ newsList }) => {
    const [search, setSearch] = React.useState('');
    const [searchRes, setSearchRes] = React.useState<{
        publishers: newsType[],
        news: newsType[],
    } | null>(null);

    React.useEffect(() => {
        function clear() {
            setSearchRes(null);
        }
        window.addEventListener('click', clear);

        return () => { window.removeEventListener('click', clear) }
    }, [])
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const publishers: newsType[] = [];
        const news: newsType[] = [];

        if (search === '' || !Array.isArray(newsList)) {
            setSearchRes(null);
            return null
        };


        console.log("Searach called")


        newsList?.forEach((newsItem) => {
            const { PUBLISHER, TITLE } = newsItem;
            if (PUBLISHER.includes(search)) publishers.push(newsItem);
            if (TITLE.includes(search)) news.push(newsItem);
        })

        publishers.sort((prev, next) => next.TIMESTAMP - prev.TIMESTAMP)
        news.sort((prev, next) => next.TIMESTAMP - prev.TIMESTAMP)

        setSearchRes({
            publishers,
            news,
        });
    }

    return (
        <>
            <div className={styles.appBar} onClick={e => e.stopPropagation()}>
                <div className={styles.home}>
                    <Link to="/homepage">  Home </Link>
                </div>
                <form onSubmit={handleSearch} className={styles.searchCtn}>

                    <input
                        className={styles.appBarSearch}
                        onChange={handleSearchChange}
                        placeholder="Search News..."
                        value={search}

                    />
                    <button type="submit" onClick={handleSearch}>
                        Search
                    </button>
                </form>
                {(searchRes !== null) && <div className={styles.searchResult}>
                    <p>News</p>
                    {searchRes.news.length === 0 && <div className={styles.noSearchResult}>Oops!! No news matching searched input.</div>}
                    {
                        searchRes.news.map(news => <div className={styles.searchItem}>
                            {news.TITLE}
                        </div>)
                    }

                    {searchRes.publishers.length > 0 && <p>Publishers</p>}
                    {
                        searchRes.publishers.map(publisher => <div className={styles.searchItem}>
                            <div className={styles.publisherName}>
                                {publisher.PUBLISHER}
                            </div>
                            <div >
                                {publisher.TITLE}
                            </div>
                        </div>)
                    }

                </div>}
            </div>

        </>
    );
};


const mapStateToProps = createStructuredSelector({
    newsList,
});

export default connect(mapStateToProps)(TopBar);