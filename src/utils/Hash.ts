import { createHash, pbkdf2Sync, randomBytes } from 'crypto';

export async function cryptoData(
  string_for_hash: string,
  type_crypto?: string,
): Promise<{ salt: string; gen_hash: string }> {
  let gen_hash = '';
  let salt = '';
  if (!string_for_hash) throw new Error('String for hash cannot be empty');

  if (type_crypto === 'md5') {
    gen_hash = createHash('md5').update(string_for_hash).digest('hex');
  } else {
    salt = await randomBytes(32).toString('hex');
    gen_hash = await pbkdf2Sync(
      string_for_hash,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');
  }
  return { salt, gen_hash };
}

export async function validString(string, hash, salt) {
  const checkHash = pbkdf2Sync(string, salt, 1000, 64, 'sha512').toString(
    'hex',
  );

  return hash === checkHash;
}
