import React from 'react';
import { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  loading: boolean;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  return (
    <div className="loading-spinner">
      <ClipLoader
        color="#36D7B7"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
