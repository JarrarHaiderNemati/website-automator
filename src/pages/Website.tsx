import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import ROUTES from "../constants/ROUTES";
import WebsiteOptions from "../components/WebsiteOptions";
import ErrorModal from "../components/ErrorModal";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setSiteBeingCreated } from "../redux/projectSlice";
import { RootState } from "../redux/store";
import createWebsite from "../api/createWebsite";

const TEXTLIMIT = 600;
const STYLE = 'Modern';
const listOfSections = ["Hero", "About", "Projects", "Services", "Contact", "Education"];

export default function Website() {
  const [created, setCreated] = useState(false);
  const [style, setStyle] = useState(STYLE);
  const [customInstructions, setCustomInstructions] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [userProjects, setUserProjects] = useState<{ name: string, description: string }[]>([]);
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const beingCreated = useSelector((state: RootState) => state.project.siteBeingCreated);

  const toggleSection = (section: string) => {
    setSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const setInstructions = (value: string) => {
    if (value.length > TEXTLIMIT) {
      setCustomInstructions(value.slice(0, TEXTLIMIT));
      return;
    }
    setCustomInstructions(value);
  };

  const displayOptions = () => {
    setOpen(true);
  };

  const generateWebsite = async () => {
    if (!name || !customInstructions) {
      setError('Website name and instructions cannot be empty');
      return;
    }
    if (!localStorage.getItem('token')) {
      alert('No token present. You are not authorized ! ');
      navigate(ROUTES.HOME);
      return;
    }
    const token = localStorage.getItem('token');
    // dispatch(setSiteBeingCreated(true));

    // Call cloudinary
    const resp = await fetch('https://3o2qjze6l4ui42nczgckctqldm0gpigu.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        projects: userProjects
      })
    });
    const newProjs = await resp.json();
    setUserProjects(newProjs);
    await createWebsite(style || 'Modern', sections || [], name || 'Portfolio Website', customInstructions || '', newProjs || []);
  }

  if (beingCreated) {
    return (
      <div>Website is being created , please hold on !</div>
    )
  }

  if (created) {
    return (

      <div className="p-6 text-center">
        <div className="text-green-400 text-xl mb-2">✅ Website created!</div>
        <p className="text-gray-400">
          Sections:{" "}
          {sections.length > 0 ? (
            <span className="text-white">{sections.join(", ")}</span>
          ) : (
            <span className="text-gray-500">None selected</span>
          )}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setCreated(false)}
        >
          🔄 Make Another
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 w-full max-w-lg mx-auto">
      {error && <ErrorModal message={error} setError={setError} />}
      <h2 className="text-lg text-gray-300">🎨 Choose Website Options</h2>

      {/* Style */}
      <div className="flex flex-col space-y-2 w-full">
        <label className="text-gray-400">Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option>Modern</option>
          <option>Minimal</option>
          <option>Dark</option>
          <option>Colorful</option>
        </select>
      </div>

      {/* Sections */}
      <div className="flex flex-col space-y-2 w-full">
        <label className="text-gray-400">Sections</label>
        <div className="grid grid-cols-2 gap-3">
          {listOfSections.map((section) => (
            <label key={section} className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={sections.includes(section)}
                onChange={() => toggleSection(section)}
                className="accent-blue-600"
              />
              <span>{section}</span>
            </label>
          ))}
        </div>
      </div>


      {/* Custom Instructions with counter */}
      <div className="w-full relative">
        <div className="absolute -top-1 right-0 text-gray-400 text-xs pr-2 pt-1">
          {TEXTLIMIT - customInstructions.length} chars left
        </div>
        <textarea
          placeholder="Custom instructions...(tell about yourself , your contact details (if you want contact section)/linkedin profile etc)"
          rows={4}
          value={customInstructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full px-4 py-2 mt-4 rounded-md bg-gray-800 text-gray-200 
                     placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      <WebsiteOptions open={open} setOpen={setOpen} userProjects={userProjects} setUserProjects={setUserProjects} setName={setName} />

      {/* Additional Options Button */}
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={displayOptions}
      >
        Click to enter details
      </button>

      <button disabled={beingCreated} className="px-6 py-2 bg-green-500 rounded" onClick={generateWebsite}>Generate Website !</button>
    </div>
  );
}
