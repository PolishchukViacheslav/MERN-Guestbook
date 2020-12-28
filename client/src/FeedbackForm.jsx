/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-materialize';
import { useHttp } from './hooks/httpHook';
import { useMessage } from './hooks/messageHook';

const initState = {
  author: '',
  message: '',
};

export const FeedbackForm = ({ addNewFeedback }) => {
  const message = useMessage();
  const {
    loading,
    request,
    error,
    clearError,
  } = useHttp();
  const [form, setForm] = useState(initState);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = ({ target }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/api/messages/add', 'POST', { ...form });
      message(data.message);
      addNewFeedback(data.feedback);
      setForm(initState);
    } catch (err) {
      message(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field col s6">
        <label htmlFor="name">Name</label>
        <input
          placeholder="Enter your name please"
          id="name"
          name="author"
          type="text"
          className="validate"
          value={form.author}
          onChange={changeHandler}
        />
      </div>
      <div className="input-field col s12">
        <textarea
          id="message"
          name="message"
          className="materialize-textarea"
          value={form.message}
          onChange={changeHandler}
        />
        <label htmlFor="message">tell us about your impressions</label>
      </div>
      <Button flat modal="close" type="submit" node="button" waves="green" disabled={loading}>Add</Button>
      <Button flat modal="close" node="button" waves="red">Close</Button>
    </form>
  );
};
