import { hl7Fields, hl7Segments } from '@/app/models/HL7Definitions';

// HL7 messages are a string, which is made up of segments. Each segment is separated by a line break. Each segment is made up of fields, which are separated by a pipe character (|)
// Fields can have subfields, which are separated by a caret (^). Subfields can have components, which are separated by an ampersand (&). Components can have subcomponents, which are separated by a tilde (~).
// the following code breaks down the HL7 message into segments, and then parses each segment into fields, subfields, components, and subcomponents.

class HL7Message {
    value: string;
    field_separator: string;
    encoding_characters: string;
    segments: Segment[];
    validation_errors: string[] = [];

    constructor(message: string) {
        this.value = message;
        const raw_segments = message.split(/\r?\n/);

        // Set the default values for field_separator and encoding_characters
        this.field_separator = '|';
        this.encoding_characters = '^~\\&';

        // Check if the first segment is MSH. If not, throw an error.
        if (raw_segments.length === 0 || !raw_segments[0].startsWith('MSH')) {
            throw new Error("Invalid HL7 message: First segment must be MSH");
        }

        this.field_separator = raw_segments[0][3];

        // Now parse the segments using the correct field_separator and encoding_characters
        this.segments = raw_segments.map((segmentString, index) => new Segment(segmentString, index + 1, this.field_separator));

        this.validateSegments();

        console.log(this.validation_errors);

    }

    validateSegments() {
        interface SegmentValidation {
            [key: string]: boolean;
        }

        let requiredSegments: SegmentValidation = {
            "MSH": false,
            "PID": false,
            "PV1": false,
        };

        this.segments.forEach(segment => {
            // Check for unknown segment types
            if (!hl7Segments.hasOwnProperty(segment.segmentType)) {
                this.validation_errors.push(`Unknown segment type: ${segment.segmentType}`);
            }
            else if (requiredSegments.hasOwnProperty(segment.segmentType)) {
                requiredSegments[segment.segmentType] = true;
            }

            // General method to validate a segment
            const validateSegmentFields = (segmentType: string, segment: Segment) => {
                // Define dictionaries for validation rules of each segment type
                const validationRules: { [segmentType: string]: { [fieldNumber: number]: string } } = {
                    'MSH': {
                        7: 'MSH-7 has no date/time.',
                        9: 'MSH-9 has no message type.',
                    },
                    'ORC': {
                        1: 'ORC-1 has no order control.',
                        2: 'ORC-2 has no placer order number.',
                        3: 'ORC-3 has no filler order number.',
                        5: 'ORC-5 has no order status.',
                        9: 'ORC-9 has no date/time of transaction.',
                    },
                    'OBR': {
                        2: 'OBR-2 has no placer order number.',
                        3: 'OBR-3 has no filler order number.',
                        4: 'OBR-4 has no universal service identifier.',
                        7: 'OBR-7 has no observation date/time.',
                        16: 'OBR-16 has no ordering provider.',
                        22: 'OBR-22 has no results status.',
                    },
                    'OBX': {
                        2: 'OBX-2 has no value type.',
                        3: 'OBX-3 has no observation identifier.',
                        5: 'OBX-5 has no observation value.',
                        8: 'OBX-8 has no interpretation code.',
                        11: 'OBX-11 has no observation result status.',
                    },
                    'PV1': {
                        2: 'PV1-2 has no patient class.',
                        19: 'PV1-19 has no visit/account number.',
                        44: 'PV1-44 has no admit date/time.'
                    },
                    'PID': {
                        3: 'PID-3 has no patient ID.',
                        5: 'PID-5 has no patient name.',
                        18: 'PID-18 has no visit/account number.'
                    },
                    'RXA': {
                        2: 'RXA-2 has no give sub-ID.',
                        3: 'RXA-3 has no date/time start of administration.',
                        5: 'RXA-5 has no administered code.',
                        6: 'RXA-6 has no administered amount.',
                        7: 'RXA-7 has no administered units.',
                        13: 'RXA-13 has no administration method.',
                        14: 'RXA-14 has no route of administration.',
                    },
                    'RXE': {
                        2: 'RXE-2 has no quantity/timing.',
                        3: 'RXE-3 has no give code.',
                        5: 'RXE-5 has no give amount - minimum.',
                        6: 'RXE-6 has no give amount - maximum.',
                        7: 'RXE-7 has no give units.',
                        8: 'RXE-8 has no give dosage form.',
                        12: 'RXE-12 has no dispense amount.',
                        13: 'RXE-13 has no dispense units.',
                    },
                };

                if (validationRules.hasOwnProperty(segmentType)) {
                    requiredSegments[segmentType] = true;
                    const rules = validationRules[segmentType];

                    for (const field in rules) {
                        if (rules.hasOwnProperty(field)) {
                            const fieldNumber = Number(field);
                            if (!segment.fieldHasValue(fieldNumber)) {
                                this.validation_errors.push(rules[fieldNumber]);
                            }
                        }
                    }
                }
            };

            validateSegmentFields(segment.segmentType, segment);
        });

        // Check for required segments
        Object.entries(requiredSegments).forEach(([segmentType, value]) => {
            if (!value) {
                this.validation_errors.push(`Missing required segment: ${segmentType}`);
            }
        });
    }
}

class Segment {
    raw_value: string;
    value: string;
    fields: Field[];
    field_separator: string;
    index: number;
    name: string;
    segmentType: string;
    description: string;
    constructor(segmentString: string, index: number, field_separator: string) {
        this.raw_value = segmentString;
        this.index = index;
        this.field_separator = field_separator;
        const fieldStrings = segmentString.split(field_separator);
        this.segmentType = fieldStrings[0]; // Assuming the first field is the segment type
        this.name = `${this.segmentType}:${index}`;

        if (this.segmentType === 'MSH') {
            // For MSH, the first token after 'MSH' is the first field
            this.fields = [new Field(this.field_separator, this.name, 1, true)];
            // The second field is the encoding characters, treated as a regular field but with no components
            this.fields.push(new Field(fieldStrings[1], this.name, 2, true));

            // Process remaining fields normally
            this.fields.push(...fieldStrings.slice(2).map((fieldString, index) =>
                new Field(fieldString, this.name, index + 3)));
        } else {
            // Process non-MSH segments
            this.fields = fieldStrings.slice(1).map((fieldString, index) =>
                new Field(fieldString, this.name, index + 1));
        }

        this.value = this.fields.map((field) => field.value).join('|');
        this.description = hl7Segments[this.segmentType] ?? "Unknown Segment";
    }

    getField(index: string | number) {
        // Convert index to a number if it's a string
        const numericIndex = typeof index === 'string' ? parseInt(index, 10) : index;

        // account for HL7 using non-zero based indexing
        return this.fields[numericIndex - 1] || null; // returns null if field does not exist
    }


    fieldHasValue(fieldIndex: number) {
        return this.getField(fieldIndex) && this.getField(fieldIndex).value.trim() !== '';
    }
}

class Field {
    raw_value: string;
    value: string;
    index: number;
    segmentType: string;
    name: string;
    description: string;
    components: Component[];
    // store the field as a string, then for each subfield map it to a Subfield object
    constructor(fieldString: string, segmentName: string, index: number, skipComponents: boolean = false) {
        this.raw_value = fieldString;
        this.index = index;
        this.segmentType = segmentName.split(':')[0];
        this.name = `${segmentName}-${index}`;
        this.description = hl7Fields[this.segmentType]?.[index.toString()] ?? "Unknown Field";

        if (!skipComponents && fieldString.includes('^')) {
            this.components = fieldString.split('^').map((componentString, index) =>
                new Component(componentString, this.name, index + 1));
        } else {
            this.components = [];
        }

        // set value of the field to be all the values of the components combined, 
        // or the field string if there are no components
        this.value = this.components.map((component) => component.value).join('^') || fieldString;
    }
    // method to get a specific subfield by index
    getComponent(index: string | number) {
        return this.components[index - 1] || null; // returns null if subfield does not exist
    }
}

class Component {
    raw_value: string;
    value: string;
    index: number;
    name: string;
    subcomponents: Subcomponent[];
    // store the subfield as a string, then for each component map it to a Component object
    constructor(componentString: string, fieldName: string, index: number) {
        this.raw_value = componentString;
        this.index = index;
        this.name = `${fieldName}.${index}`;
        if (componentString.includes('&')) {
            this.subcomponents = componentString.split('&').map((subcomponentString: string, index) => new Subcomponent(subcomponentString, this.name, index + 1));
        } else {
            this.subcomponents = [];
        }

        // set value of the component to be all the values of the subcomponents combined,
        // or the component string if there are no subcomponents
        this.value = this.subcomponents.map((subcomponent) => subcomponent.value).join('&') || componentString;
    }
    // method to get a specific component by index
    getSubcomponent(index: string | number) {
        return this.subcomponents[index - 1] || null; // returns null if component does not exist
    }
}

class Subcomponent {
    raw_value: string;
    value: string;
    index: number;
    name: string;
    constructor(subcomponentString: any, componentName: any, index: any) {
        this.raw_value = subcomponentString;
        this.value = subcomponentString;
        this.index = index;
        this.name = `${componentName}.${index}`;
    }
}

export { HL7Message, Segment, Field, Component, Subcomponent };