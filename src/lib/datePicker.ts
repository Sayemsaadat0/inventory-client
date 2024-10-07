import React from 'react';

export const showDatePicker = (e: React.MouseEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  if (target.showPicker) {
    target.showPicker();
  }
};
