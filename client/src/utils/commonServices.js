export function base64ToBlob(base64String, contentType = '') {
  let base64 = base64String.trim();

  // If base64 is a data URL, extract base64 part + content type
  if (base64.startsWith('data:')) {
    const parts = base64.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid base64 data URL');
    }
    const matches = parts[0].match(/data:(.*);base64/);
    if (matches) {
      contentType = matches[1];
    }
    base64 = parts[1];
  }

  try {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    let bolb = new Blob([new Uint8Array(byteArrays)], { type: contentType });
    console.log(bolb,"nnnnnnnnnnnnn")
    return  
  } catch (err) {
    console.error("Invalid base64 string:", base64String);
    throw new Error("Failed to convert base64 to Blob: " + err.message);
  }
}

