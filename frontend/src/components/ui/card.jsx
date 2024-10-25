import React from 'react';

// Card container component
export function Card({ children, className }) {
  return (
    <div className={`border rounded-lg shadow-sm p-4 ${className}`}>
      {children}
    </div>
  );
}

// Card header component
export function CardHeader({ children }) {
  return (
    <div className="border-b pb-2 mb-2">
      {children}
    </div>
  );
}

// Card title component
export function CardTitle({ title }) {
  return (
    <h2 className="text-lg font-semibold">{title}</h2>
  );
}

// Card content component
export function CardContent({ children }) {
  return (
    <div className="text-sm">
      {children}
    </div>
  );
}
