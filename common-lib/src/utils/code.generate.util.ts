import bs58 from 'bs58';

export class CodeGenerator {
  private static compressUUID(uuid: string): string {
    // exchange uuid into hex
    const uuidBuffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');

    // Encode buffer into Base58
    const encoded = bs58.encode(uuidBuffer);

    return encoded.substring(0, 6); // cut 6 first characters
  }

  static generateCode(prefix: string, uuid: string): string {
    const shortCode = this.compressUUID(uuid);
    return `${prefix}-${shortCode.toUpperCase()}`;
  }
}
