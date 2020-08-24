import React from 'react';

export default function IconButton(props) {
  return (
    <div{...props.wrapperProps}>
      <div
        {...props.iconProps}
      />
    </div>
  );
}
