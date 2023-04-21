import React, { useState, useEffect } from 'react';
import './preview.css';
export default function UploadButton(props) {
  return (
    <div className="box">
      <div className="js--image-preview"></div>
      <div className="upload-options">
        <label>
          <input
            type="file"
            className="image-upload"
            multiple
            onChange={props.addImage}
          />
        </label>
      </div>
    </div>
  );
}
