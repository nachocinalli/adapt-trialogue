import React from 'react';
import { compile, classes } from 'core/js/reactHelpers';
export default function trialogueMessage({ message, isAnim }) {
  const { text, sender } = message;

  return (
    <div
      className={classes([
        'trialogue__message',
        sender === 'guest' ? 'trialogue__message-guest' : sender === '' ? 'trialogue__message-meta' : 'trialogue__message-host'
      ])}
      // ref={innerRef}
    >
      <div className='trialogue__message__inner'>
        {text && !isAnim && (
          <div className='trialogue__message__text'>
            <div className='trialogue__message__text-inner' dangerouslySetInnerHTML={{ __html: compile(text) }}></div>
          </div>
        )}
        {text && isAnim && (
          <div className='trialogue__message__anim'>
            <div className='wave'>
              <span className='dot'></span>
              <span className='dot'></span>
              <span className='dot'></span>
            </div>
          </div>
        )}
        <div className='trialogue__message-sender'></div>
      </div>
    </div>
  );
}
