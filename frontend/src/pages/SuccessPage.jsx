import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function SuccessPage() {
  const url = localStorage.getItem("uploadedUrl");
  const [theme, setTheme] = useState("light");

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

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Copy share link
  const copyLink = useCallback(() => {
    if (!url) return alert("No uploaded URL found");
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }, [url]);

  // Download handler
  const handleDownload = useCallback(async () => {
    if (!url) return alert("No uploaded URL found");

    try {
      const response = await fetch(encodeURI(url), {
        mode: "cors",
        headers: { Accept: "image/*, application/octet-stream" },
        cache: "no-store",
      });

      if (!response.ok)
        throw new Error(`Failed to fetch file: ${response.status}`);

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = decodeURIComponent(url.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed — please retry or rename the image.");
    }
  }, [url]);

  // ------------------------------------------
  // RETURN WITH CONDITIONAL THEME VARIANT
  // ------------------------------------------
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {theme === "light" ? (
        // 🌞 LIGHT THEME DESIGN
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 transition-all duration-300">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all">
              {url ? (
                <>
                  {/* Image Preview */}
                  <div className="w-full bg-gray-100 rounded-xl p-4 flex justify-center items-center">
                    <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
                      <img
                        src={url}
                        alt="uploaded preview"
                        className="max-h-[70vh] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                    >
                      <img
                        src="../resources/Link.svg"
                        alt="Share"
                        className="w-4 h-4 opacity-80"
                      />
                      Share
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                    >
                      <img
                        src="../resources/download.svg"
                        alt="Download"
                        className="w-4 h-4 brightness-0 invert"
                      />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-600">No uploaded image found. Please upload first.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        // 🌚 DARK THEME DESIGN
        <main className="min-h-[calc(100vh-64px)] bg-slate-900 transition-all duration-300">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 transition-all">
              {url ? (
                <>
                  {/* Image Preview */}
                  <div className="w-full bg-slate-700 rounded-xl p-4 flex justify-center items-center">
                    <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
                      <img
                        src={url}
                        alt="uploaded preview"
                        className="max-h-[70vh] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                    >
                      <img
                        src="../resources/Link.svg"
                        alt="Share"
                        className="w-4 h-4 brightness-0 invert"
                      />
                      Share
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                    >
                      <img
                        src="../resources/download.svg"
                        alt="Download"
                        className="w-4 h-4 brightness-0 invert"
                      />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-slate-300">No uploaded image found. Please upload first.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}