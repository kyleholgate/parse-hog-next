"use client"


import React, { useState, useEffect } from 'react';
// import from src/models/HL7Message.tsx
import HL7Message from '../models/HL7Message';
import Segment from './hl7/Segment';

const HL7Parser = () => {

  const [text, setText] = useState('');
  const [parsedMessage, setParsedMessage] = useState(null);
  const [outputs, setOutputs] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (text) {
        const message = new HL7Message(text);
        setParsedMessage(message);
        console.log(message);
        setOutputs(message.segments.map((segment, index) => (
            <Segment key={index} segment={segment} />
        )));
    }
    }, [text]);

        
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div>
        <h1 className="text-2xl font-bold mb-3">Enter Your HL7</h1>
        <textarea 
          className="w-3/4 h-64 p-4 border rounded text-black font-bold"
          placeholder="Paste HL7 message here..."
          value={text}
          onChange={handleTextChange}
        />
    </div>
    <div>
        <h1 className="text-2xl font-bold mb-3">Parsed Message</h1>
        <div id='parsedOutput'>{outputs}</div>
    </div>
    </div>
  );
};

export default HL7Parser;
