import { v4 as uuidv4 } from 'uuid';

export const encodeOrganizationIdIntoString = (organizationId: number): string => {
    const prefix = "ORG";
    const uuid = uuidv4(); // Generates a unique UUID
    return `${prefix}-${uuid}-${organizationId}`;
}


export const decodeOrganizationIdFromString = (encodedString: string): number | null => {
    const parts = encodedString.split('-');
    if (parts.length < 3) return null; // Ensure the format is correct

    const base64EncodedId = parts[2];
    try {
        const decodedId = Buffer.from(base64EncodedId, 'base64').toString('utf8');
        return parseInt(decodedId, 10);
    } catch (e) {
        return null;
    }
}
