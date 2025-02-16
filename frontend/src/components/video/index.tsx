import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";

export const VideoPage = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, _] = useState(true);
  const [timestamps, __] = useState<
    {
      content: string;
      timestamp: number;
    }[]
  >([]);

  const handleVideoUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideo(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 gap-4">
      {!videoUrl ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-500 rounded-2xl cursor-pointer p-4">
          <UploadCloud className="size-12 text-primary mb-2" />
          <span className="text-sm">Загрузить видео</span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
      ) : (
        <div className="w-full flex flex-col items-center">
          <video
            controls
            className="w-fit rounded-2xl shadow-lg mx-auto max-h-[400px] max-w-full"
          >
            <source src={videoUrl} type={video!.type} />
            Your browser does not support the video tag.
          </video>
          {!loading && (
            <Button className="mt-4" onClick={() => setVideoUrl("")}>
              <UploadCloud className="size-4" /> Загрузить новое
            </Button>
          )}
        </div>
      )}
      {videoUrl && loading && (
        <AnimatedShinyText>
          Подождите. Идет обработка видео...
        </AnimatedShinyText>
      )}
      {videoUrl &&
        timestamps &&
        timestamps.map(({ content, timestamp }, i) => <button></button>)}
    </div>
  );
};
