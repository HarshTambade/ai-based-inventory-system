// src/components/ui/alert.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const Alert = ({ children, variant }) => {
  const getAlertStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-100 border border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border border-blue-400 text-blue-700';
      case 'success':
        return 'bg-green-100 border border-green-400 text-green-700';
      default:
        return 'bg-gray-100 border border-gray-400 text-gray-700';
    }
  };

  return (
    <div className={`p-4 rounded-md ${getAlertStyles()}`}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['destructive', 'info', 'success', 'default']),
};

Alert.defaultProps = {
  variant: 'default',
};
