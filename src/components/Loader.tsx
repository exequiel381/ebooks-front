import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };

    const containerClasses = fullScreen
        ? 'min-h-screen flex justify-center items-center'
        : 'flex justify-center items-center py-12';

    return (
        <div className={containerClasses}>
            <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
        </div>
    );
};

export default Loader;
