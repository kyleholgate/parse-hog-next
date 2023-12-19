"use client"


import React, { useState, useEffect } from 'react';
import HL7Message from '../../models/HL7Message';
import SegmentContainer from '../hl7/SegmentContainer';
import Heading from '@/app/components/ui/Heading';

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
        <SegmentContainer key={segment.name} segment={segment} />
      )));
    }
  }, [text]);


  return (
    <div className="flex flex-col items-center justify-center">
      <div className='w-full'>
        <Heading level={2} text="Enter Your HL7 Message" />
        <span className='text-sm text-gray-500'>Your message will automatically be parsed.</span>
        <textarea
          id='hl7Input'
          className="w-full h-96 p-4 rounded text-lg ibm-plex-mono font-normal bg-background border-2 border-gray-300 text-foreground focus:border-foreground focus:outline-none focus:shadow-[0_0_5px_2px_rgba(0,0,0,0.5)]"
          placeholder="Paste HL7 message here..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className='w-full'>
        <Heading level={2} text="Parsed HL7 Output" />
        <span className='text-sm text-gray-500'>Hover a field to see its' description. Click a field to copy it to your clipboard.</span>
        <div id='parsedOutput' className="w-full overflow-x-auto whitespace-pre-wrap ibm-plex-mono divide-y-2 text-lg">{outputs}</div>
      </div>
    </div>

  );
};

export default HL7Parser;
