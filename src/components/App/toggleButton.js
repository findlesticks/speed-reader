import React from 'react';

export const TYPES = {
  TEXT: 'Text',
  ABSTRACT: 'Abstract',
};

export default function ToggleButtons({ setInput }) {
  return (
    <div>
      <button
        onClick={() => setInput(TYPES.ABSTRACT)}
      >{TYPES.ABSTRACT}</button>
      <button
        onClick={() => setInput(TYPES.TEXT)}
      >{TYPES.TEXT}</button>
    </div>
  )
}
