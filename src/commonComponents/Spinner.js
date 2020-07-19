import {connect} from 'react-redux';
import React from 'react';

function SpinnerWidget({spinnerOn}) {
  if (!spinnerOn) {
    return <div />;
  }
  return (
    <div style={styles.container}>
      Loading...
    </div>
  );
}
const mapStateToProps = store => {
  return {
    spinnerOn: store.general.spinnerOn.length > 0,
    spinnerOptions: store.general.spinnerOptions,
  };
};

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(206,206,206,0.47)',
    fontSize: '4rem'
  },
  horizontal: {},
};

export default connect(mapStateToProps)(SpinnerWidget);
