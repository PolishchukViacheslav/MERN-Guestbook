/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Button, Modal } from 'react-materialize';
import { FeedbackForm } from './FeedbackForm';

export const AddFeedbackModal = ({ onAdd }) => (
  <>
    <Modal
      actions={[]}
      bottomSheet={false}
      fixedFooter={false}
      header="Feedback form"
      id="Modal-0"
      open={false}
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
      }}
      trigger={<Button node="button">Leave a feedback</Button>}
    >
      <FeedbackForm addNewFeedback={onAdd} />
    </Modal>
  </>
);
