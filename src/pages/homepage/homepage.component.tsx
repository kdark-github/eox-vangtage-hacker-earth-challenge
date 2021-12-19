import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { hashedNewType } from '../../redux/news/news-reducer';
import { newsList, newsObject, isNewsLoading } from '../../redux/news/news-selector';
import styles from './homepage.module.css';
import { RouteComponentProps } from 'react-router';

interface HomepageProps extends RouteComponentProps {
    newsObject?: hashedNewType,
}

const Homepage: React.FunctionComponent<HomepageProps> = ({
    newsObject, history,
}) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { value } = event.currentTarget;
        history.push(`/publisher/${value}`)
    }

    return (
        <>
            <div className={styles.homepagectn}>

                {
                    Object.keys({ ...newsObject }).map(publisher =>
                        <button
                            className={styles.publisherButton}
                            value={publisher}
                            onClick={handleClick}
                        >
                            {publisher}
                        </button>
                    )
                }
            </div>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    newsList,
    isNewsLoading,
    newsObject,
});

export default connect(mapStateToProps)(Homepage);
