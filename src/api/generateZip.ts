import JSZip from "jszip";

async function generateZip(files) {
  console.log('Generating zip with files ', files);

  try {
    const zip = new JSZip();

    files.forEach((file, index) => {
      // Use exact path provided by v0
      const filePath = file.meta?.file;

      if (!filePath) {
        // fallback (very rare)
        zip.file(`misc/file-${index}.txt`, file.source);
        return;
      }

      zip.file(filePath, file.source);
    });

    const blob = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "v0-project.zip";
    a.click();

    console.log('Download initiated for zip file.');
    URL.revokeObjectURL(a.href);
  }
  catch (error) {
    console.error('Error generating zip file: ', error);
    alert('An error occurred while generating the zip file. Please try again.');
  }
}

export default generateZip;