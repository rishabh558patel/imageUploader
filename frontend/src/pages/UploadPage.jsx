import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function UploadPage() {
  const [theme, setTheme] = useState("light");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = systemDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Upload handler
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5050/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => {
        setUploading(false);
        localStorage.setItem("uploadedUrl", res.data.file.url);
        navigate("/success");
      }, 700);
    } catch {
      alert("Upload failed. Try a smaller image (max 2MB)");
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile({ target: { files: [file] } });
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 👇 Conditional layout — Light vs Dark */}
      {theme === "light" ? (
        // 🌞 LIGHT THEME UI
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50 transition-all duration-300 relative">
          <div
            className="bg-white border-2 border-dashed border-gray-300 rounded-2xl shadow-md w-[640px] h-[280px] flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-600 transition-all duration-300"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <img src="../resources/logo-small.svg" alt="Upload Icon" className="w-8 h-8 mb-5 opacity-80" />
            <p className="text-gray-800 font-medium text-base mb-1">
              Drag & drop a file or{" "}
              <label htmlFor="fileInput" className="text-blue-600 cursor-pointer hover:underline">
                browse files
              </label>
            </p>
            <p className="text-gray-500 text-sm">
              JPG, PNG or GIF – Max file size 2MB
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {/* Upload overlay */}
          {uploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-50/90">
              <div className="bg-white rounded-xl p-7 shadow-lg w-[420px] text-center">
                <p className="text-gray-800 text-[15px] mb-6">
                  <strong>Uploading,</strong> please wait..
                </p>
                <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-600 rounded-full animate-progress"></div>
                </div>
                <style>{`
                  @keyframes progressMove {
                    0% { transform: translateX(-30%); }
                    50% { transform: translateX(80%); }
                    100% { transform: translateX(-30%); }
                  }
                  .animate-progress {
                    animation: progressMove 1.6s infinite ease-in-out;
                  }
                `}</style>
              </div>
            </div>
          )}
        </div>
      ) : (
        // 🌚 DARK THEME UI
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-slate-900 transition-all duration-300 relative">
          <div
            className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-2xl shadow-md w-[640px] h-[280px] flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-500 transition-all duration-300"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <img src="../resources/logo-small.svg" alt="Upload Icon" className="w-8 h-8 mb-5 opacity-90" />
            <p className="text-gray-100 font-medium text-base mb-1">
              Drag & drop a file or{" "}
              <label htmlFor="fileInput" className="text-blue-400 cursor-pointer hover:underline">
                browse files
              </label>
            </p>
            <p className="text-slate-400 text-sm">
              JPG, PNG or GIF – Max file size 2MB
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {/* Upload overlay */}
          {uploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-slate-900/80 transition-colors duration-300">
              <div className="bg-slate-800 rounded-xl p-7 shadow-lg w-[420px] text-center">
                <p className="text-gray-100 text-[15px] mb-6">
                  <strong>Uploading,</strong> please wait..
                </p>
                <div className="relative w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-500 rounded-full animate-progress"></div>
                </div>
                <style>{`
                  @keyframes progressMove {
                    0% { transform: translateX(-30%); }
                    50% { transform: translateX(80%); }
                    100% { transform: translateX(-30%); }
                  }
                  .animate-progress {
                    animation: progressMove 1.6s infinite ease-in-out;
                  }
                `}</style>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}