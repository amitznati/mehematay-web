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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    height: 50,
    borderBottomLeftRadius: 20,
  },
  inputStyle: {
    flex: 11,
    height: 50,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    borderTopRightRadius: 20,
  },
};
export default SearchInput;
