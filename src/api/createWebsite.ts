async function callGemini(style, sections, websiteName, customInstructions, userProjects, photoUrls, videoUrls) { //Extracts categories from the prompt and generate content first time of creating the website
  console.log('Before calling gemini , user projects are ', userProjects, ' photoUrls are ', photoUrls, ' videoUrls are ', videoUrls);

  const token = localStorage.getItem('token');

  if (!token) {
    alert('No token present. You are not authorized ! ');
    return;
  }

  const reqs = await fetch('https://6rdq3rs2b7tv7b24szuz25eqja0tlmwq.lambda-url.us-east-1.on.aws/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      style,
      sections,
      websiteName,
      customInstructions,
      userProjects,
      photoUrls,
      videoUrls
    })
  });
  const resp = await reqs.json();
  console.log('Type of resp is', typeof resp);
  let text = resp.output
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  return text;
}

async function createWebsite(style, sections, websiteName, customInstructions, userProjects) {
  let photoUrls = {};
  let videoUrls = {};

  userProjects.forEach(proj => {
    photoUrls[proj.name] = proj.image;
  })

  userProjects.forEach(proj => {
    videoUrls[proj.name] = proj.video;
  });

  try {
    console.log('Creating....');
    const geminiResp = await callGemini(style, sections, websiteName, customInstructions, userProjects, photoUrls, videoUrls);

    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token present. You are not authorized ! ');
      return;
    }

    const chat = await fetch('https://24ab3lfe4kryejbgnuabjd4ov40wewzz.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        style,
        sections,
      })
    });
    const chatData = await chat.json();
    console.log('Chat data URL is ', chatData.url);
    console.log('Chat data files are ', chatData.files);

    // const chat = await v0.chats.create({
    //   message: `You are an expert full stack web developer. A user has asked you to build his
    //       portfolio website. 

    //     -> The style for the website should be ${style}

    //     -> Here is the website name :
    //     ${websiteName} 

    //     -> The website should contain the following sections :
    //       ${sections}

    //     -> Here are the custom instructions given by user (MAKE SURE YOU ADHERE TO THEM) :
    //     ${customInstructions}

    //     -> Here are the user projects :
    //     ${JSON.stringify(userProjects)}

    //     -> Here are the URLS of screenshot of user projects :
    //     ${JSON.stringify(photoUrls)}
    //     NOTE : Use the best screenshot for thumbnail of the project

    //     -> Here are the URLS of demo video of user proejcts :
    //     ${JSON.stringify(videoUrls)}
    //     NOTE : If there are multiple vidoes , choose the best one for demo

    //     IMPORTANT POINTS TO CONSIDER :
    //     -> Dynamically render all sections based on the json content file provided so that future changes can update dynamically
    //     instead of manually changing the code. If a section is not present in the content file , do not render it on the website.
    //     -> Choose the best image to put as thumbnail in project card , use the cloudinary link 
    //     given as src of the image tag , AND only one demo video is given for each project , add it as the 
    //     demo video of the project
    //     -> ONLY include the sections given in prompt
    //   `
    // });

  }
  catch (err) {
    console.log("Error", err);
  }
};

export default createWebsite;