import React, { useState } from 'react';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';


const App = () => {
  return (
    <Provider store={store}>
        <RootNavigation />
    </Provider>
  );
};

export default App;
