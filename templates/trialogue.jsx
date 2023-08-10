import React, { useState, useEffect, useRef } from 'react';
import { templates } from 'core/js/reactHelpers';

export default function Trialogue(props) {
  const { _items, onClick } = props;
  const [messagesHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState([]);
  const [isAnim, setIsAnim] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const messageRef = useRef(null);
  function handleOnClick(item, option) {
    onClick(item, option);

    setIsAnim(true);
    messageRef?.current?.scrollIntoView();
  }

  useEffect(() => {
    const activeItemModel = _items.find((item) => item._isActive);

    if (!activeItemModel || activeItemModel === activeItem) return;

    setActiveItem(activeItemModel);
    const visitedItems = _items.filter((item) => item._isVisited);
    setMessageHistory(visitedItems);
    setMessage(activeItemModel);

    const animationTimeout = setTimeout(() => {
      setIsAnim(false);
      setTimeout(() => {
        messageRef?.current?.scrollIntoView();
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [_items]);
  return (
    <div className='component__inner trialogue__inner'>
      <templates.header {...props} />
      <div className='component__widget trialogue__widget'>
        <templates.trialogueMessagesHistory messages={messagesHistory} />
        <templates.trialogueMessage message={message} innerRef={messageRef} isAnim={isAnim} />
        <templates.trialogueBottomBar onClick={handleOnClick} activeItem={activeItem} isAnim={isAnim} />
      </div>
    </div>
  );
}
