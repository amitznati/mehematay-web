import React from 'react';
import {IconButton} from '../../../../commonComponents';
import SearchInput from './SearchLocation.searchInput';

export default function SearchLocationView(props) {
  const {locationResults, searchLocation, onBack, onSelect} = props;

  const onSelectLocation = location => {
    onSelect(location);
  };

  const renderLocationItem = location => {
    return (
      <div
        key={location.formattedName}
        onClick={() => onSelectLocation(location)}>
        <p>{location.formattedName}</p>
      </div>
    );
  };

  return (
    <div>
      <IconButton
        name="arrow-left-circle-outline"
        pack="material-community"
        size={50}
        wrapperProps={{
          onClick: () => onBack(),
          style: styles.iconViewStyle,
        }}
      />
      <p>החיפוש לפי ערים בלבד!</p>
      <SearchInput onSearch={searchLocation} />
      <div>
        {locationResults.map(renderLocationItem)}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 24,
    paddingRight: 24,
  },
  iconViewStyle: {
    alignSelf: 'flex-end',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  locationText: {
    fontSize: 20,
  },
};
