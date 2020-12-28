import React, { useEffect, useState } from 'react';
import 'materialize-css';
import { Collection } from 'react-materialize';
import { AddFeedbackModal } from './AddFeedbackModal';
import { FeedbackList } from './FeedbackList';
import { useMessage } from './hooks/messageHook';
import { useHttp } from './hooks/httpHook';

function App() {
  const message = useMessage();
  const [feedbacks, setFeedbacks] = useState([]);
  const { request } = useHttp();

  const updateFeedbacks = (newFeedback) => {
    setFeedbacks((prevState) => ([newFeedback, ...prevState]));
  };

  useEffect(async () => {
    try {
      const response = await request('/api/messages/getAll');
      setFeedbacks(response.feedbacks);
      message(response.message);
    } catch (error) {
      message(error.message);
    }
  }, []);
  return (
    <div className="container">
      <h1>Hotel California guestbook</h1>
      <AddFeedbackModal onAdd={updateFeedbacks} />
      <Collection>
        <FeedbackList data={feedbacks} />
      </Collection>
    </div>
  );
}

export default App;
