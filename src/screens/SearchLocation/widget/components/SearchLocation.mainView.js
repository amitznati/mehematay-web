import React from 'react';
import {SearchLocation as UISearchLocation} from 'az-ui-library';

export default function SearchLocationMainView({searchLocation, locationResults, onSelectLocation, selectedLocation}) {
  return (
    <div>
      <UISearchLocation
        onSearch={searchLocation}
        searchResults={locationResults}
        onSelectLocation={onSelectLocation}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}
