export const pickUploadPolicy = (dir: 'profile' | 'letter' | 'sticker' | 'folder') => {
  if (dir === 'profile') return { maxSide: 1024, quality: 0.85 };
  if (dir === 'sticker') return { maxSide: 1024, quality: 0.85 };
  if (dir === 'letter') return { maxSide: 1600, quality: 0.85 };
  return { maxSide: 1600, quality: 0.85 };
};

export const compressImage = async (file: File, maxSide: number, quality: number) => {
  const bitmap = await createImageBitmap(file);

  const w = bitmap.width;
  const h = bitmap.height;
  const m = Math.max(w, h);
  const scale = m > maxSide ? maxSide / m : 1;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas context null');

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const isPng = file.type === 'image/png';
  const outType = isPng ? 'image/png' : 'image/jpeg';

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
      outType,
      isPng ? undefined : quality
    );
  });

  const nextName = isPng ? file.name : file.name.replace(/\.\w+$/, '.jpg');

  return new File([blob], nextName, { type: outType });
};
