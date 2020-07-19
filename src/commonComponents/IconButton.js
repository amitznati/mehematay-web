import React from 'react';

export default function IconButton(props) {
  const size = props.size || 50;
  const styles = {
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: size,
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
    },
    icon: {
      width: size,
      height: size,
      color: props.color,
    },
  };

  return (
    <div{...props.wrapperProps}>
      <div
        {...props.iconProps}
      />
    </div>
  );
}
