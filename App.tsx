import React, { useState } from 'react';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { config } from './src/utils/config';
import Toast from './src/components/message/Toast';


const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={config.STRIP_KEY}>
        <RootNavigation />
      </StripeProvider>
      <Toast />
    </Provider>
  );
};

export default App;
