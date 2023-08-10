import React from 'react';
import { classes } from 'core/js/reactHelpers';
export default function trialogueBottomBar({ activeItem, onClick, isAnim }) {
  return (
    <div className='trialogue__bottom-bar'>
      <div className='trialogue__bottom-bar__inner'>
        <div className='trialogue__bottom-bar__buttons'>
          {activeItem?.next === 'feedback' && (
            <button
              className={classes(['btn-text', isAnim && 'is-disabled'])}
              disabled={isAnim}
              onClick={() => onClick(activeItem, { text: 'restart' })}
            >
              start again
            </button>
          )}

          {activeItem?.next === 'item' &&
            activeItem?._options.map((option, index) => (
              <button
                className={classes(['btn-text', isAnim && 'is-disabled'])}
                key={index}
                disabled={isAnim}
                onClick={() => onClick(activeItem, option)}
              >
                {option.text}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
