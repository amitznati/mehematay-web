import React from 'react';

import './CardsSwift.scss';

const CardsSwift = ({
  data,
  activeIndex,
  renderItem,
  onSwiftLeft,
  onSwiftRight
}) => {
  const [state, setState] = React.useState({});
  const getItemClass = (index) =>
    activeIndex - index >= 0
      ? `up${activeIndex - index}`
      : `down${index - activeIndex}`;
  const stopMoving = () => {
    setState({
      startPoint: {},
      moving: false
    });
  };
  const onTouchStart = e => {
    setState({
      startPoint: {x: e.touches[0].pageX},
      moving: true
    });
  };
  const onTouchEnd = () => {
    stopMoving();
  };
  const onTouchMove = e => {
    if (state.moving) {
      if (e.touches[0].pageX - state.startPoint.x > 100) {
        stopMoving();
        onSwiftLeft && onSwiftLeft();
      } else if (e.touches[0].pageX - state.startPoint.x < -100) {
        stopMoving();
        onSwiftRight && onSwiftRight();
      }
    }
  };
  const getItemStyle = (index) => {
    const ratio = Math.abs(activeIndex - index);
    const isBig = index > activeIndex;
    return {
      opacity: `${1 - ratio * 0.2}`,
      left: `${
        ratio !== 0
          ? `calc(${isBig ? '-' : ''}5px + ${
            isBig ? `-7% - ${ratio}%` : `17% + ${ratio}%`
          })`
          : '5%'
      }`,
      zIndex: 100 - ratio,
      transform: `${
        ratio !== 0
          ? `rotate3d(0, 1, 0, ${
            isBig ? '10deg' : '-10deg'
          }) scale3d(0.7, 0.9, 1)`
          : ''
      }`,
    };
  };
  return (
    <div className="cards-swift-container">
      <div className="cards-swift">
        {data.map((item, i) =>
          Math.abs(activeIndex - i) > 5 ? null : (
            <div
              key={`cards-swift-card-${i}`}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
              className="cards-swift--item"
              style={getItemStyle(i)}
            >
              {renderItem(item, i)}
            </div>
          ))}
      </div>
    </div>
  );
};
export default CardsSwift;
