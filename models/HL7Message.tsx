import { hl7Fields, hl7Segments } from '@/models/HL7Definitions';

// HL7 messages are a string, which is made up of segments. Each segment is separated by a line break. Each segment is made up of fields, which are separated by a pipe character (|)
// Fields can have subfields, which are separated by a caret (^). Subfields can have components, which are separated by an ampersand (&). Components can have subcomponents, which are separated by a tilde (~).
// the following code breaks down the HL7 message into segments, and then parses each segment into fields, subfields, components, and subcomponents.

class HL7Message {
    value: string;
    field_separator: string;
    encoding_characters: string;
    component_separator: string;
    repetition_separator: string;
    escape_character: string;
    subcomponent_separator: string;
    segments: Segment[];
    validation_errors: string[] = [];

    constructor(message: string) {
        this.value = message;
        const raw_segments = message.split(/\r?\n/);

        // Set the default values for field_separator and encoding_characters
        // These will be overridden if MSH-1 and MSH-2 are present
        this.field_separator = '|';
        this.component_separator = '^';
        this.repetition_separator = '~';
        this.escape_character = '\\';
        this.subcomponent_separator = '&';
        this.encoding_characters = `${this.component_separator}${this.repetition_separator}${this.escape_character}${this.subcomponent_separator}`;

        // Check if the first segment is MSH. If not, throw an error.
        if (raw_segments.length === 0 || !raw_segments[0].startsWith('MSH')) {
            throw new Error("Invalid HL7 message: First segment must be MSH");
        }

        // MSH-1: Field Separator
        this.field_separator = raw_segments[0][3];

        // MSH-2: Encoding Characters
        const mshFields = raw_segments[0].split(this.field_separator);
        const msh2 = mshFields[1];

        if (msh2 && msh2.length >= 4) {
            this.component_separator = msh2[0];
            this.repetition_separator = msh2[1];
            this.escape_character = msh2[2];
            this.subcomponent_separator = msh2[3];
            // Update encoding_characters string with the actual values from MSH-2
            this.encoding_characters = msh2.substring(0, 4); 
        }
        // If MSH-2 is not present or too short, the defaults set earlier remain in use.
        // Ensure encoding_characters reflects the separators actually in use.
        this.encoding_characters = `${this.component_separator}${this.repetition_separator}${this.escape_character}${this.subcomponent_separator}`;


        // Now parse the segments using the correct field_separator and encoding_characters
        this.segments = raw_segments.map((segmentString, index) => new Segment(segmentString, index + 1, this.field_separator, this.component_separator, this.subcomponent_separator));

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
    component_separator: string; // Added
    subcomponent_separator: string; // Added

    constructor(segmentString: string, index: number, field_separator: string, component_separator: string, subcomponent_separator: string) { // Modified
        this.raw_value = segmentString;
        this.index = index;
        this.field_separator = field_separator;
        this.component_separator = component_separator; // Added
        this.subcomponent_separator = subcomponent_separator; // Added
        const fieldStrings = segmentString.split(field_separator);
        this.segmentType = fieldStrings[0]; // Assuming the first field is the segment type
        this.name = `${this.segmentType}:${index}`;

        if (this.segmentType === 'MSH') {
            // For MSH, the first token after 'MSH' is the first field (which is the field separator itself)
            // It should not be processed for components/subcomponents.
            this.fields = [new Field(this.field_separator, this.name, 1, this.component_separator, this.subcomponent_separator, true)];
            // The second field is the encoding characters, also treated as a regular field but with no components
            this.fields.push(new Field(fieldStrings[1], this.name, 2, this.component_separator, this.subcomponent_separator, true));

            // Process remaining fields normally, passing the separators
            this.fields.push(...fieldStrings.slice(2).map((fieldString, idx) =>
                new Field(fieldString, this.name, idx + 3, this.component_separator, this.subcomponent_separator)));
        } else {
            // Process non-MSH segments, passing the separators
            this.fields = fieldStrings.slice(1).map((fieldString, idx) =>
                new Field(fieldString, this.name, idx + 1, this.component_separator, this.subcomponent_separator));
        }

        this.value = this.fields.map((field) => field.value).join(this.field_separator); // ensure correct separator is used here too
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
    component_separator: string; // Added
    subcomponent_separator: string; // Added

    // store the field as a string, then for each subfield map it to a Subfield object
    constructor(fieldString: string, segmentName: string, index: number, component_separator: string, subcomponent_separator: string, skipComponents: boolean = false) { // Modified
        this.raw_value = fieldString;
        this.index = index;
        this.segmentType = segmentName.split(':')[0];
        this.name = `${segmentName}-${index}`;
        this.description = hl7Fields[this.segmentType]?.[index.toString()] ?? "Unknown Field";
        this.component_separator = component_separator; // Added
        this.subcomponent_separator = subcomponent_separator; // Added

        if (!skipComponents && fieldString && fieldString.includes(this.component_separator)) { // check fieldString exists
            this.components = fieldString.split(this.component_separator).map((componentString, idx) => // use idx to avoid conflict
                new Component(componentString, this.name, idx + 1, this.subcomponent_separator)); // Pass subcomponent_separator
        } else {
            this.components = [];
        }

        // set value of the field to be all the values of the components combined, 
        // or the field string if there are no components
        this.value = this.components.length > 0 ? this.components.map((component) => component.value).join(this.component_separator) : fieldString; // use this.component_separator
    }
    // method to get a specific subfield by index
    getComponent(index: string | number) {
        const numericIndex = typeof index === 'string' ? parseInt(index, 10) : index;

        return this.components[numericIndex - 1] || null; // returns null if subfield does not exist
    }
}

class Component {
    raw_value: string;
    value: string;
    index: number;
    name: string;
    subcomponents: Subcomponent[];
    subcomponent_separator: string; // Added
    // store the subfield as a string, then for each component map it to a Component object
    constructor(componentString: string, fieldName: string, index: number, subcomponent_separator: string) { // Modified
        this.raw_value = componentString;
        this.index = index;
        this.name = `${fieldName}.${index}`;
        this.subcomponent_separator = subcomponent_separator; // Added

        if (componentString && componentString.includes(this.subcomponent_separator)) { // check componentString exists
            this.subcomponents = componentString.split(this.subcomponent_separator).map((subcomponentString: string, idx) => // use idx to avoid conflict
                new Subcomponent(subcomponentString, this.name, idx + 1));
        } else {
            this.subcomponents = [];
        }

        // set value of the component to be all the values of the subcomponents combined,
        // or the component string if there are no subcomponents
        this.value = this.subcomponents.length > 0 ? this.subcomponents.map((subcomponent) => subcomponent.value).join(this.subcomponent_separator) : componentString; // use this.subcomponent_separator
    }
    // method to get a specific component by index
    getSubcomponent(index: string | number) {
        const numericIndex = typeof index === 'string' ? parseInt(index, 10) : index;

        return this.subcomponents[numericIndex - 1] || null; // returns null if component does not exist
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