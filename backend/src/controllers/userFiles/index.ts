import { exec } from "child_process";
import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";
import util from "util";
const execAsync = util.promisify(exec);

export const filesPath = "/home/anas/projects/coverly/backend/files";

export const createUserFile = async (fileData: string) => {
  const fileId = uuidv4();
  fs.writeFileSync(
    `/home/anas/projects/coverly/backend/files/${fileId}`,
    fileData,
    {
      flag: "w",
    },
  );
  return fileId;
};
// latexmk -pdf -outdir=build main.tex

export const handleUserFile = async (fileId: string) => {
  const { stderr, stdout } = await execAsync(
    `latexmk -pdf ${filesPath}/${fileId} -outdir=${filesPath}`,
  );

  if (stderr) throw new Error("failed to compile the latex template");
  return stdout;
};

export const cleanLatexRaw = async () => {
  const { stderr, stdout } = await execAsync(
    "rm -rf /home/anas/projects/coverly/backend/files/",
  );
};

export const createPDF = async (data: string) => {
  try {
    const fileId = await createUserFile(data);
    await handleUserFile(fileId);
    return fileId;
  } catch {
    throw new Error("failed to create pdf!");
  }
};
