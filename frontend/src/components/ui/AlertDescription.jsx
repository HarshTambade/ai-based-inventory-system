// src/components/ui/alertDescription.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
};
