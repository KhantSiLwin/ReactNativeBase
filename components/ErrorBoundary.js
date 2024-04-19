// ErrorBoundary.js

import React from 'react';
import { Alert } from 'react-native';

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // Display an error alert
    Alert.alert('Error', error.toString());
  }

  render() {
    if (this.state.hasError) {
      return null; // You can also render a custom error UI here
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
