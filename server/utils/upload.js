
import multer from "multer";

const storage = multer.memoryStorage(); //store file temporarily in memory

export default multer({ storage });
