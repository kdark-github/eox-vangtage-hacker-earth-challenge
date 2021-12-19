import React from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchNewsFailure, fetchNewsStart, fetchNewsSuccess } from './redux/news/new-actions';
import MainRouter from './route/main-router/main-router.component';
function App() {


  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(fetchNewsStart());
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json')
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Error fetching data !")
      })
      .then(data => {
        dispatch(fetchNewsSuccess(data));
      })
      .catch(error => {
        console.error('Error fetching data', error);
        dispatch(fetchNewsFailure());
      })
  }

  return (
    <>
      <MainRouter />
    </>
  );
}

export default App;
