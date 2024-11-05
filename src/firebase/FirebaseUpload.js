import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase";
import { v4 } from "uuid";

export const uploadFileToFirebase = async (imageUpload, setImgURL, setLoader) => {
  if (imageUpload == null) return;

  setLoader(true);

  try {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);

    setImgURL(url);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setLoader(false);
  }
};
