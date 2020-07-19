import React from 'react';

export default function NextPrevNavigator({main, next, prev}) {
  const Side = ({side, mainValue, secondaryValue, clickAction}) => {
    const isNext = side === 'next';
    return (
      <div
        onClick={clickAction}>
        {isNext && <span></span>}
        <div >
          {mainValue && (
            <span>{mainValue}</span>
          )}
          {secondaryValue && (
            <span>
              {secondaryValue}
            </span>
          )}
        </div>
        {!isNext && <span></span>}
      </div>
    );
  };

  const MainValue = ({mainValue, secondaryValue, clickAction}) => {
    return (
      <div
        onClick={clickAction}>
        {mainValue && (
          <span>{mainValue}</span>
        )}
        {secondaryValue && (
          <span>
            {secondaryValue}
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <Side {...next} side="next" />
      <MainValue {...main} />
      <Side {...prev} side="prev" />
    </div>
  );
}

