import { Plus, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "./ErrorModal";

interface WebsiteOptionsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userProjects: { name: string; description: string }[];
  setUserProjects: React.Dispatch<React.SetStateAction<{ name: string; description: string }[]>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function WebsiteOptions({ open, setOpen, userProjects, setUserProjects, setName }: WebsiteOptionsProps) {
  const [websiteName, setWebsiteName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<{ name: string; description: string }[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const MAXLIMITPHOTOS = 1; //Max limit for images
  const MAXLIMITVIDEOS = 1; //MAx limit for videos

  const inputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setProjects(userProjects);
  }, [])

  // Sets website name 
  const nameChange = (name: string) => {
    setWebsiteName(name);
  }

  // Sets project description
  const descriptionChange = (desc: string) => {
    setDescription(desc);
  }

  const addProject = () => {
    if (projectName.trim() === "" || description.trim() === "") {
      setError("Project name and description cannot be empty.");
      return;
    };
    setProjects([...projects, { name: projectName, description, image: image, video: video }]);
    setProjectName("");
    setDescription("");
  };

  // Disables this component on clicking close
  const closeOptions = () => {
    setUserProjects(projects);
    setName(websiteName);
    setOpen(false);
  }

  const triggerSelection = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const triggerVideoSelection = () => {
    if (videoRef.current) {
      videoRef.current.click();
    }
  }

  //5 images
  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImage(e.target.files[0]);
  }

  const removeImage = () => {
    setImage({});
  }

  //Only 1 vid 
  const selectVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setVideo(e.target.files[0]);
  }

  const removeVideo = () => {
    setVideo({});
  }

  // If not open, do not render anything
  if (!open) return null;

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {error && <ErrorModal message={error} setError={setError} />}
      {/* CARD */}
      <div
        className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl p-8 relative mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <X
          onClick={closeOptions}
          className="w-5 h-5 absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
        />

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Portfolio Builder
        </h2>

        {/* Scrollable Form */}
        {/* Website Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Name
          </label>
          <input
            type="text"
            value={websiteName}
            onChange={(e) => nameChange(e.target.value)}
            placeholder="Enter website name"
            className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Projects
          </label>

          <div className="space-y-4">
            {/* Project Name */}
            <div>
              <label
                htmlFor="projectName"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Project Name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Resume Analyzer"
                className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="projectDesc"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Description
              </label>
              <textarea
                id="projectDesc"
                value={description}
                onChange={(e) => descriptionChange(e.target.value)}
                placeholder="Brief description"
                rows={3}
                className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Images
              </label>
            </div>

            <div className="w-full min-h-8 bg-blue-500 flex flex-wrap gap-2 p-2 items=center">
              {image &&
                (
                  <div className="bg-blue-600 relative p-2 overflow-ellipsis">
                    <div>{image.name}</div>
                    <X onClick={removeImage} className="w-4 h-4 absolute top-0 right-0 cursor-pointer" />
                  </div>
                )
              }
              <div onClick={triggerSelection} className="bg-gradient-to-r from-green-500 to-green-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <Plus className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Videos
              </label>
            </div>

            <div className="w-full min-h-8 bg-purple-500 flex flex-wrap gap-2 p-2 items=center">
              {video && (
                <div className="bg-purple-600 relative p-2 overflow-ellipsis">
                  <div>{video.name}</div>
                  <X onClick={removeVideo} className="w-4 h-4 absolute top-0 right-0 cursor-pointer" />
                </div>
              )
              }
              <div onClick={triggerVideoSelection} className="bg-gradient-to-r from-pink-500 to-pink-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <Plus className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            <input type="file" ref={inputRef} onChange={(e) => selectImage(e)}
              accept="image/*"
              hidden />

            <input type="file" ref={videoRef} onChange={(e) => selectVideo(e)}
              accept="video/*"
              hidden />

            {/* Add Project Button */}
            <button
              type="button"
              onClick={addProject}
              className="flex items-center justify-center w-full py-2 border-2 border-dashed border-blue-400 rounded-lg text-blue-600 hover:bg-blue-50 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Project
            </button>
          </div>
        </div>

        {/* Display Added Projects */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Your Projects
            </h3>
            <div className="grid gap-4">
              {projects.map((proj, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-md font-bold text-gray-900">
                    {proj.name}
                  </h4>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-800 max-w-xs overflow-hidden rounded-md mt-2 p-2">
                    <p className="text-sm text-gray-100 break-words whitespace-normal">
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
