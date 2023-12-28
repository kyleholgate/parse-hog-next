"use client"


import React, { useState, useEffect } from 'react';
import { MdInfoOutline, MdExpandMore, MdContentCopy } from 'react-icons/md';
import HL7Message from '../../models/HL7Message';
import SegmentContainer from '../hl7/SegmentContainer';
import Heading from '@/app/components/ui/Heading';
import Tooltip from '@/app/components/ui/Tooltip';

const HL7Parser = () => {

  // change to signals
  const [text, setText] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const [error, setError] = useState('');

  const toggleTips = () => {
    setIsTipsVisible(!isTipsVisible);
  };

  const handleTextChange = (event) => {
    setError('');
    setText(event.target.value);
  };

  useEffect(() => {
    if (text) {
      const cleaned_text = text.split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');

      try {
        const message = new HL7Message(cleaned_text);
        console.log(message);
        setOutputs(message.segments.map((segment) => (
          <SegmentContainer key={segment.name} segment={segment} />
        )));
      } catch (err) {
        setError(err.message);
        setOutputs([]);
      }
    }
  }, [text]);


  return (
    <div className="flex flex-col items-center justify-center">
      <div className='w-full'>
        <Heading level={2}>
          <>
            Enter Your HL7 Message <Tooltip content="Your message will automatically be parsed."><span><MdInfoOutline className='inline-block text-2xl text-gray-500' /></span></Tooltip>
          </>
        </Heading>
        {error && <div className='text-red-500 font-bold text-xl'>{error}</div>}
        <textarea
          id='hl7Input'
          className="w-full h-96 p-4 rounded text-lg ibm-plex-mono font-normal bg-background border-2 border-gray-300 text-foreground focus:border-foreground focus:outline-none focus:shadow-[0_0_5px_2px_rgba(0,0,0,0.5)]"
          placeholder="Paste HL7 message here..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className='w-full'>
        <Heading level={2}>
          <>
            Parsed Output
          </>
        </Heading>
        <button className='px-6 py-2 mb-2 text-gray-500 hover:bg-gray-100 border border-gray-300 rounded text-center' onClick={toggleTips}>Show tips</button>
        <div className={`flex px-4 rounded transition-all duration-200 ease-in-out ${isTipsVisible ? 'py-2 max-h-screen' : 'py-0 max-h-0 border-none'} overflow-hidden bg-stone-100 border text-foreground`}>
          <ul className='list-disc ps-4'>
            <li><strong>Hover</strong> over any field to see its definition</li>
            <li>Click on any field to <strong>copy it</strong></li>
            <li>Click on the segment's <strong>expand icon</strong> <MdExpandMore class="inline" /> to see the full definition table</li>
            <li>Click on the segment's <strong>copy icon</strong> <MdContentCopy class="inline" /> to copy the segment's raw value</li>
          </ul>
        </div>
        <div id='parsedOutput' className="w-full overflow-x-auto whitespace-pre-wrap ibm-plex-mono divide-y-2 text-lg">{outputs}</div>
      </div>
    </div >

  );
};

export default HL7Parser;
