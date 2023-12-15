"use client"


import React, { useState, useEffect } from 'react';
// import from src/models/HL7Message.tsx
import HL7Message from '../models/HL7Message';
import Segment from './hl7/Segment';
import { ibmPlexMono } from '@/app/fonts';

const HL7Parser = () => {

  // change to signals
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
      setOutputs(message.segments.map((segment) => (
        <Segment key={segment.name} segment={segment} />
      )));
    }
  }, [text]);


  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className='w-3/4'>
        <h2 className="text-2xl font-bold mb-3">Enter Your HL7</h2>
        <textarea
          id='hl7Input'
          className="w-full h-64 p-4 rounded ibm-plex-mono font-normal bg-background border-2 border-gray-400 text-foreground focus:border-midgreen focus:outline-none"
          placeholder="Paste HL7 message here..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className='w-3/4'>
        <h2 className="text-2xl font-bold mb-3">Parsed Message</h2>
        <div id='parsedOutput' className="w-full overflow-x-auto whitespace-pre-wrap ibm-plex-mono">{outputs}</div>
      </div>
    </div>

  );
};

export default HL7Parser;
