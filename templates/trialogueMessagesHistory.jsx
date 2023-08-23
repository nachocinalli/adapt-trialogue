import React from 'react';
import { compile, classes } from 'core/js/reactHelpers';
export default function trialogueMessagesHistory({ messages, innerRef }) {
  return (
    <div className='trialogue__messages-history' ref={innerRef}>
      <div className='trialogue__messages-history__inner'>
        {messages.map((item) => (
          <div key={item._index}>
            <div
              className={classes([
                item.sender === 'guest' ? 'trialogue__message-guest' : item.sender === '' ? 'trialogue__message-meta' : 'trialogue__message-host'
              ])}
            >
              <div className='trialogue__messages-history__inner'>
                <div className='trialogue__messages-history__content__text'>
                  <div className='trialogue__messages-history__text-inner' dangerouslySetInnerHTML={{ __html: compile(item.text) }}></div>
                </div>
                <div className='trialogue__messages-history-sender'></div>
              </div>
            </div>
            {item?._options?.map(
              ({ text, sender, _index, _isSelected }) =>
                _isSelected &&
                text !== 'start again' && (
                  <div key={_index} className='trialogue__message-guest'>
                    <div className='trialogue__messages-history__inner'>
                      <div className='trialogue__messages-history__text'>
                        <div className='trialogue__messages-history__text-inner' dangerouslySetInnerHTML={{ __html: compile(text) }}></div>
                      </div>
                      <div className='trialogue__messages-history-sender'></div>
                    </div>
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
