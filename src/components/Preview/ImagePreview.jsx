import React, { useState, useEffect } from 'react';
import './preview.css';
export default function ImagePreview(props) {
  return (
    <div className="box">
      <div className="image-preview" style={{ width: '100%', height: '108px' }}>
        <img
          src={props.url?.image?.url || props.url?.url}
          width="150px"
          height="108px"
        />
      </div>
      <div
        className="delete-options"
        onClick={() => props.deleteImage(props.url)}
      >
        <label></label>
      </div>
    </div>
  );
}
