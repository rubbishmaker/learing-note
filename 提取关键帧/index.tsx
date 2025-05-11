import { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

function VideoKeyFrameExtractor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [keyFrames, setKeyFrames] = useState<{ name: string; data: string }[]>([]);
  const [progress, setProgress] = useState(0);

  // 初始化 FFmpeg
  useEffect(() => {
    ffmpeg.load().catch(console.error);
    ffmpeg.setProgress(({ ratio }) => setProgress(ratio * 100));
  }, []);

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  // 提取关键帧
  const extractKeyFrames = async () => {
    if (!videoFile || !ffmpeg.isLoaded()) return;

    try {
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
      await ffmpeg.run(
        "-i", "input.mp4",
        "-vf", "select='eq(pict_type,PICT_TYPE_I)',showinfo",
        "-vsync", "vfr",
        "keyframe_%03d.png"
      );

      const outputFiles = ffmpeg.FS("readdir", "/")
        .filter(name => name.startsWith("keyframe"));
      const frames = await Promise.all(
        outputFiles.map(async (file) => ({
          name: file,
          data: URL.createObjectURL(
            new Blob([ffmpeg.FS("readFile", file).buffer], { type: "image/png" })
          )
        }))
      );

      setKeyFrames(frames);
    } catch (err) {
      console.error("提取失败:", err);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      <button onClick={extractKeyFrames} disabled={!videoFile}>
        提取关键帧
      </button>
      <div>进度: {progress.toFixed(1)}%</div>

      {/* 显示关键帧 */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {keyFrames.map((frame) => (
          <img
            key={frame.name}
            src={frame.data}
            alt="关键帧"
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}