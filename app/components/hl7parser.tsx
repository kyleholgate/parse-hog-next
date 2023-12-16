"use client"


import React, { useState, useEffect } from 'react';
// import from src/models/HL7Message.tsx
import HL7Message from '../models/HL7Message';
import Segment from './hl7/Segment';
import SegmentRow from './SegmentRow';

const HL7Parser = () => {

  // change to signals
  const [text, setText] = useState('');
  const [outputs, setOutputs] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (text) {
      const cleaned_text = text.split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');

      const message = new HL7Message(cleaned_text);
      console.log(message);
      setOutputs(message.segments.map((segment) => (
        <SegmentRow key={segment.name} segment={segment} />
      )));
    }
  }, [text]);


  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className='w-3/4'>
        <h2 className="text-2xl font-bold mb-3">Enter Your HL7</h2>
        <textarea
          id='hl7Input'
          className="w-full h-64 p-4 rounded ibm-plex-mono font-normal bg-background border-2 border-gray-300 text-foreground focus:border-foreground focus:outline-none focus:shadow-[0_0_5px_2px_rgba(0,0,0,0.5)]"
          placeholder="Paste HL7 message here..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className='w-3/4'>
        <h2 className="text-2xl font-bold mb-3">Parsed Message</h2>
        <div id='parsedOutput' className="w-full overflow-x-auto whitespace-pre-wrap ibm-plex-mono divide-y-2">{outputs}</div>
      </div>
    </div>

  );
};

export default HL7Parser;
