async function callCloudinary(projects) {
  //For simplicity only allow 1 image and 1 video
  let index = 0;
  let tempProjects = structuredClone(projects);

  for (const proj of projects) {
    const imgData = new FormData();
    imgData.append('img', proj.image);
    try {
      const imgReq = await fetch('http://localhost:5678/webhook/244de52a-d8df-4f21-97d8-5861b6e0657a', {
        method: 'POST',
        body: imgData
      });

      const vidData = new FormData();
      vidData.append('img', proj.video);
      const vidReq = await fetch('http://localhost:5678/webhook/244de52a-d8df-4f21-97d8-5861b6e0657a', {
        method: 'POST',
        body: vidData
      });

      if (imgReq.ok&&vidReq.ok) {
        const imgResp = await imgReq.json();
        const vidResp = await vidReq.json();
        tempProjects = tempProjects.map((p, i) => i === index ? ({ ...p, image: imgResp.url,video:vidResp.url }) : p);
      }
      else {
        throw new Error('Failed to upload to cloudinary')
      }
    }
    catch (err) {
      console.log('The error is ', err);
    }
    index++;
  }
  console.log('Temp projects after cloudinary upload ', tempProjects);
  return tempProjects;
}

export default callCloudinary;