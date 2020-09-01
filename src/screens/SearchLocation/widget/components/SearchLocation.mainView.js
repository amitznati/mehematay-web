import React from 'react';
import {SearchLocation as UISearchLocation} from 'az-ui-library';

export default function SearchLocationMainView({searchLocation, locationResults, onSelectLocation, selectedLocation, onSearchMyLocation}) {
  return (
    <div>
      <UISearchLocation
        onSearch={searchLocation}
        searchResults={locationResults}
        onSelectLocation={onSelectLocation}
        selectedLocation={selectedLocation}
        onSearchMyLocation={onSearchMyLocation}
      />
    </div>
  );
}
