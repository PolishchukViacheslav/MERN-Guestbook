/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Chip,
  CollectionItem,
  Icon,
} from 'react-materialize';

export const FeedbackList = ({ data }) => (
  <>
    {data.map((feedback) => (
      <CollectionItem
        key={feedback._id}
      >
        <span className="title">{feedback.message}</span>
        <br />
        <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          options={null}
        >
          {`Author: ${feedback.author}`}
        </Chip>
        <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          options={null}
        >
          {`added: ${new Date(feedback.created_at).toLocaleDateString()} ${new Date(feedback.created_at).toLocaleTimeString()}`}
        </Chip>
      </CollectionItem>
    ))}
  </>
);
