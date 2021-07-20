import React from 'react';

import PollPreview from './PollPreview';
import Error from './HandleError';

const Poll = props => {
  const { id } = props.match.params;
  const { answeredIds, unansweredIds } = props;
  return (
    <div className = "poll">
      {answeredIds.includes(id) ? (
        <PollPreview id={id} answered={true} />
      ) : unansweredIds.includes(id) ? (
        <PollPreview id={id} answered={false} />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Poll;
