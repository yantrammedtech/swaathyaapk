import { registerRootComponent } from 'expo';

import App from './App';
import { Provider } from 'react-redux';
import store from './src/store/store';


const AppWithStore = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  registerRootComponent(AppWithStore);