```typescript
import { webcrypto } from 'crypto';

const { subtle } = webcrypto;

export class Encryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  static async generateKey(): Promise<CryptoKey> {
    return subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(data: string, key: CryptoKey): Promise<string> {
    const iv = webcrypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const encodedData = new TextEncoder().encode(data);

    const encryptedData = await subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv
      },
      key,
      encodedData
    );

    const encryptedArray = new Uint8Array(encryptedData);
    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    return Buffer.from(combined).toString('base64');
  }

  static async decrypt(encryptedData: string, key: CryptoKey): Promise<string> {
    const combined = Buffer.from(encryptedData, 'base64');
    const iv = combined.slice(0, this.IV_LENGTH);
    const data = combined.slice(this.IV_LENGTH);

    const decryptedData = await subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv
      },
      key,
      data
    );

    return new TextDecoder().decode(decryptedData);
  }
}
```