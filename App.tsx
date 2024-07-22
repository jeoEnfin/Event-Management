import React, { useState } from 'react';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { config } from './src/utils/config';


const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={config.STRIP_KEY}>
        <RootNavigation />
      </StripeProvider>
    </Provider>
  );
};

export default App;
