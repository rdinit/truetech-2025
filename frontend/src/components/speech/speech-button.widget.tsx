import { observer } from "mobx-react-lite";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FC, useEffect, useMemo } from "react";
import { debounce } from "@/utils/debounce";
import { cn } from "@/utils/cn";
import { Mic } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  onSpeech: (text: string) => void;
  transcriptEnd: (text: string) => void;
}

export const SpeechButton: FC<Props> = observer((x) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const transcriptEnd = useMemo(
    () =>
      debounce((text: string) => {
        SpeechRecognition.stopListening();
        x.transcriptEnd(text);
        resetTranscript();
      }, 4000),
    [resetTranscript, x.transcriptEnd],
  );

  useEffect(() => {
    if (transcript.trim().length) {
      x.onSpeech(transcript);
      transcriptEnd(transcript);
    }
  }, [transcript, transcriptEnd, x.onSpeech]);

  if (!browserSupportsSpeechRecognition) return;

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => {
        if (listening) {
          SpeechRecognition.stopListening();
          return;
        }
        SpeechRecognition.startListening({
          language: "ru-RU",
          continuous: true,
        });
      }}
    >
      <Mic className={cn("size-6", listening ? "text-red-500" : "text-bg")} />
    </Button>
  );
});
