"use client"


import React, { useState, useEffect } from 'react';
import { MdInfoOutline, MdExpandMore, MdContentCopy } from 'react-icons/md';
import { HL7Message } from '@/app/models/HL7Message';
import { SegmentSectionProps } from '@/app/components/hl7/SegmentSection';
import SegmentSection from '@/app/components/hl7/SegmentSection';
import Heading from '@/app/components/ui/Heading';
import Tooltip from '@/app/components/ui/Tooltip';
import { sampleHL7Messages } from '@/app/data/SampleData';

const HL7Parser = () => {

  // change to signals
  const [text, setText] = useState('');
  const [outputs, setOutputs] = useState<React.ReactElement<SegmentSectionProps>[]>([]);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const [isSampleMessagesVisible, setIsSampleMessagesVisible] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const toggleTips = () => {
    setIsTipsVisible(!isTipsVisible);
  };

  const toggleSampleMessages = () => {
    setIsSampleMessagesVisible(!isSampleMessagesVisible);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError('');
    setText(event.target.value);
  };

  const setADTMessage = () => {
    setText(sampleHL7Messages.ADT);
  };

  const setLabMessage = () => {
    setText(sampleHL7Messages.LAB);
  };

  const setPharmacyMessage = () => {
    setText(sampleHL7Messages.PHARMACY);
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
          <SegmentSection key={segment.name} segment={segment} />
        )));

        // Update state with validation errors
        setValidationErrors(message.validation_errors);
      } catch (err: any) {
        setError(err.message);
        setOutputs([]);
        setValidationErrors([]); // Clear previous errors if any
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
        <div className='text-gray-500 pb-1'>or view <a className='underline cursor-pointer' onClick={toggleSampleMessages}>sample messages</a></div>
        <div className={`flex px-4 rounded transition-all duration-200 ease-in-out ${isSampleMessagesVisible ? 'py-1 max-h-screen mb-2' : 'py-0 max-h-0 border-none'} overflow-hidden text-foreground`}>
          <div className="container mx-auto px-4 md:px-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 content-center justify-center">
              <button className="w-full md:w-1/2 py-2 bg-gray-500 text-white rounded mx-auto" onClick={setADTMessage}>ADT</button>
              <button className="w-full md:w-1/2 py-2 bg-gray-500 text-white rounded mx-auto" onClick={setLabMessage}>Lab</button>
              <button className="w-full md:w-1/2 py-2 bg-gray-500 text-white rounded mx-auto" onClick={setPharmacyMessage}>Pharmacy</button>
            </div>
          </div>
        </div>
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
        <button className='px-6 py-1 mb-2 text-gray-500 hover:bg-gray-100 border border-gray-300 rounded text-center' onClick={toggleTips}>Show tips</button>
        <div className={`flex px-4 rounded transition-all duration-200 ease-in-out ${isTipsVisible ? 'py-2 max-h-screen' : 'py-0 max-h-0 border-none'} overflow-hidden bg-stone-100 border text-foreground`}>
          <ul className='list-disc ps-4'>
            <li><strong>Hover</strong> over any field to see its definition</li>
            <li>Click on any field to <strong>copy it</strong></li>
            <li>Click on the segment's <strong>expand icon</strong> <MdExpandMore className="inline" /> to see the full definition table</li>
            <li>Click on the segment's <strong>copy icon</strong> <MdContentCopy className="inline" /> to copy the segment's raw value</li>
          </ul>
        </div>
        {validationErrors.length > 0 && (
          <div id="validationErrors" className="font-bold p-2 bg-pink-200 rounded">
            <div className="text-xl">Validation Errors:</div>
            {validationErrors.map((error, index) => (
              <div key={index} className='py-2 ps-2'>{error}</div>
            ))}
          </div>
        )}
        <div id='parsedOutput' className="w-full overflow-x-auto whitespace-pre-wrap ibm-plex-mono divide-y-2 text-lg">{outputs}</div>
      </div>
    </div >

  );
};

export default HL7Parser;
