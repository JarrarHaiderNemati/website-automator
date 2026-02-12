async function callCloudinary(projects) {
  console.log('Inside callCloudinary ');
  let tempProjects = structuredClone(projects);

  for (let i = 0; i < projects.length; i++) { 
    console.log('This is fors loops ', i, 'th', ' iteration');

    const proj = projects[i];
    console.log('About to make a form data ! ');

    const imgData = new FormData();
    console.log('Form data made');

    console.log(typeof proj.image);
    console.log(proj.image instanceof File);
    console.log(proj.image instanceof Blob);

    imgData.append('img', proj.image);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token present. You are not authorized ! ');
      return;
    }
    try {
      console.log('About to upload image to cloundiary ! ');
      const imgReq = await fetch('http://localhost:5678/webhook/244de52a-d8df-4f21-97d8-5861b6e0657a', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: imgData,
      });
      console.log('Image uploadedd to clounidary ! ');

      console.log('Avbout  to create form data for video ! ');

      console.log(typeof proj.video);
      console.log(proj.video instanceof File);
      console.log(proj.video instanceof Blob);


      const vidData = new FormData();
      vidData.append('img', proj.video);

      const vidReq = await fetch('http://localhost:5678/webhook/244de52a-d8df-4f21-97d8-5861b6e0657a', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: vidData,
      });

      console.log('Form data created for video ! ');

      if (imgReq.ok && vidReq.ok) {
        console.log('About to parse both ! ');
        try {
          const imgResp = await imgReq.json();
          const vidResp = await vidReq.json();
          tempProjects[i] = { ...tempProjects[i], image: imgResp.url, video: vidResp.url };
        }
        catch (err) {
          throw new Error ('Unable to parse images and vids ! ');
        }

      }
      else {
        throw new Error('Failed to upload to cloudinary')
      }
    }
    catch (err) {
      console.error('The error is ', err);
      throw err;
    }
  }
  return tempProjects;
}

export default callCloudinary;