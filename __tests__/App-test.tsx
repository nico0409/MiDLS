/**
 * @format
 */

import 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import React from 'react';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

