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

    fieldHasValue(segment: Segment, fieldIndex: number) {
        return segment.getField(fieldIndex) && segment.getField(fieldIndex).value.trim() !== '';
    }

    validateSegments() {
        let requiredSegments = {
            "MSH": false,
            "PID": false,
            "PV1": false,
        };

        this.segments.forEach(segment => {
            // Check for unknown segment types
            if (!hl7Segments.hasOwnProperty(segment.segmentType)) {
                this.validation_errors.push(`Unknown segment type: ${segment.segmentType}`);
            }

            // Check for MSH segment
            if (segment.segmentType === 'MSH') {
                requiredSegments.MSH = true;
            }

            // Check for PID segment
            if (segment.segmentType === 'PID') {
                requiredSegments.PID = true;
                if (!segment.getField(18) || segment.getField(18).value.trim() === '') {
                    this.validation_errors.push('PID-18 has no visit/account number.');
                }
            }

            // Check for PV1 segment
            if (segment.segmentType === 'PV1') {
                requiredSegments.PV1 = true;
                if (!this.fieldHasValue(segment, 2)) {
                    this.validation_errors.push('PV1-2 has no patient class.');
                }
                if (!this.fieldHasValue(segment, 19)) {
                    this.validation_errors.push('PV1-19 has no visit/account number.');
                }
                if (!this.fieldHasValue(segment, 44)) {
                    this.validation_errors.push('PV1-44 has no admit date/time.');
                }
            }
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
        // account for HL7 using non-zero based indexing
        return this.fields[index - 1] || null; // returns null if field does not exist
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

export default HL7Message;