// HL7 messages are a string, which is made up of segments. Each segment is separated by a line break. Each segment is made up of fields, which are separated by a pipe character (|)
// Fields can have subfields, which are separated by a caret (^). Subfields can have components, which are separated by an ampersand (&). Components can have subcomponents, which are separated by a tilde (~).
// the following code breaks down the HL7 message into segments, and then parses each segment into fields, subfields, components, and subcomponents.

class HL7Message {
    value: string;
    segments: Segment[];
    constructor(message: string) {
        this.value = message;
        this.segments = message.split(/\r?\n/).map((segmentString: any, index) => new Segment(segmentString, index + 1));
    }
    getSegment(index: string | number) {
        return this.segments[index] || null; // returns null if segment does not exist
    }

    // method that renders the HL7 message to the DOM

}

class Segment {
    value: string;
    fields: Field[];
    index: number;
    name: string;
    segmentType: string;
    constructor(segmentString: string, index: number) {
        this.value = segmentString;
        this.index = index;
        const fieldStrings = segmentString.split('|');
        this.segmentType = fieldStrings[0]; // Assuming the first field is the segment type
        this.name = `${this.segmentType}:${index}`;
        this.fields = fieldStrings.map((fieldString, index) => new Field(fieldString, this.name, index + 1));
    }

    getField(index: string | number) {
        // account for HL7 using non-zero based indexing
        return this.fields[index - 1] || null; // returns null if field does not exist
    }
}

class Field {
    value: string;
    index: number;
    segmentType: string;
    name: string;
    components: Component[];
    // store the field as a string, then for each subfield map it to a Subfield object
    constructor(fieldString: string, segmentName: string, index: number) {
        this.value = fieldString;
        this.index = index;
        this.segmentType = segmentName.split(':')[0];
        this.name = `${segmentName}-${index}`;

        if (fieldString.includes('^')) {
            this.components = fieldString.split('^').map((componentString: string, index) => new Component(componentString, this.name, index + 1));
        } else {
            this.components = [];
        }
    }
    // method to get a specific subfield by index
    getComponent(index: string | number) {
        return this.components[index - 1] || null; // returns null if subfield does not exist
    }
}

class Component {
    value: string;
    index: number;
    name: string;
    subcomponents: Subcomponent[];
    // store the subfield as a string, then for each component map it to a Component object
    constructor(componentString: string, fieldName: string, index: number) {
        this.value = componentString;
        this.index = index;
        this.name = `${fieldName}.${index}`;
        if (componentString.includes('&')) {
            this.subcomponents = componentString.split('&').map((subcomponentString: string, index) => new Subcomponent(subcomponentString, this.name, index + 1));
        } else {
            this.subcomponents = [];
        }
    }
    // method to get a specific component by index
    getSubcomponent(index: string | number) {
        return this.subcomponents[index - 1] || null; // returns null if component does not exist
    }
}

class Subcomponent {
    value: string;
    index: number;
    name: string;
    constructor(subcomponentString: any, componentName: any, index: any) {
        this.value = subcomponentString;
        this.index = index;
        this.name = `${componentName}.${index}`;
    }
}

export default HL7Message;