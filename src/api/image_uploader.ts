export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!
  );

  return fetch(process.env.REACT_APP_CLOUDINARY_URL!, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
