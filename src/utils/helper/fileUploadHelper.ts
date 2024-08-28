const extensionToTypeMap:any = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".aac": "audio/aac",
  ".wma": "video/x-ms-asf",
  ".mp4": "video/mp4",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".wmv": "video/x-ms-asf",
  ".flv": "video/x-flv",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
  ".rtf": "application/rtf",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
  ".rar": "application/vnd.rar",
  ".tar": "application/x-tar",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};


export const getMimeTypesFromExtensions = (extensions: string[]): string[] => {
  return extensions.map(extension => extensionToTypeMap[extension]);
};

export const generateId = (): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 5);
  return `${timestamp}-${randomString}`;
};

export const sanitizeFilename = (filename: string): string => {
  // Replace spaces with hyphens
  let sanitized = filename.replace(/\s+/g, '-');
  // Remove special characters except for hyphens, underscores, and dots
  sanitized = sanitized.replace(/[^a-zA-Z0-9\-\_\.]/g, '');
  return  sanitized;
};

export const getOnePendingFileIdFromFileQueue = (items: any) => {
  for (const key in items) {
      if (items.hasOwnProperty(key) && items[key]["status"] === "pending") {
          return items[key]["id"];
      }
  }
  return null;
}

export const base64ToArrayBuffer = (base64: any) => {
  const binaryString = Buffer.from(base64, 'base64').toString('binary');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;// ArrayBuffer that can be used as binary data
};

export const stringToBinary = (input: string) => {
  return input
    .split('')
    .map((char) => {
      // Convert each character to its ASCII code
      const binary = char.charCodeAt(0).toString(2);
      // Pad the binary string with leading zeros if necessary to ensure it's 8 bits
      return binary.padStart(8, '0');
    })
    .join(' ');
};