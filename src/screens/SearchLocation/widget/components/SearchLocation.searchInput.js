import React from 'react';

export const SearchInput = ({onSearch}) => {
  const [value, setValue] = React.useState('');

  const onIconPress = () => {
    value && onSearch && onSearch(value);
  };

  // const SearchIcon = style => {
  //   return <Icon name="magnify" pack="material-community" />;
  // };

  return (
    <div>
      <button
        onClick={onIconPress}
      />
      <input
        value={value}
        size="large"
        placeholder="חפש מקום"
        onChange={setValue}
      />
    </div>
  );
};

export default SearchInput;
