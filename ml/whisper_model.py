import torch
import os
import subprocess
import torchaudio
from torchaudio.transforms import Resample
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor


class WhisperModel:
    def __init__(self):
        flag = torch.cuda.is_available()

        self.model_id = 'openai/whisper-medium' if flag else 'openai/whisper-base'
        self.dtype = torch.float16 if flag else torch.float32
        self.device = 'cuda' if flag else 'cpu'

        model = AutoModelForSpeechSeq2Seq.from_pretrained(
            self.model_id, torch_dtype=self.dtype, low_cpu_mem_usage=True, use_safetensors=True
        ).to(self.device)

        processor = AutoProcessor.from_pretrained(self.model_id)

        self.model = model
        self.processor = processor
        self.forced_decoder_ids_eng = processor.get_decoder_prompt_ids(language='english', task='transcribe')
        self.resampler = {}
        self.vad, self.vad_utils = torch.hub.load(repo_or_dir='snakers4/silero-vad',
                                                  model='silero_vad',
                                                  force_reload=False,
                                                  onnx=True)

        working_dir = 'ml'

        if not os.path.exists(os.path.join(working_dir, 'tmp')):
            os.makedirs(os.path.join(working_dir, 'tmp'))

    def process_sample(self, filename):
        print(filename) # .wav file !!!

        clip, clip_hz = torchaudio.load(filename, backend='ffmpeg')

        except Exception as e:
            print(f'Error: {e}')
            return ''

        if clip_hz != 16000:
            if clip_hz not in self.resampler:
                self.resampler[clip_hz] = Resample(clip_hz, 16000)
            clip = self.resampler[clip_hz](clip)

        clip = clip.mean(dim=0)  # stereo to mono
        speech_ts = self.vad_utils[0](clip.unsqueeze(0), self.vad, sampling_rate=16000, threshold=0.1)

        full = []
        for ts in speech_ts:
            with torch.inference_mode():
                input_features = self.processor(
                    clip[ts['start']:ts['end'] + 1], sampling_rate=16000, return_tensors='pt'
                ).input_features.to(self.dtype).to(self.device)

                predicted_ids_eng = self.model.generate(input_features,
                                                        forced_decoder_ids=self.forced_decoder_ids_eng,
                                                        do_sample=True,
                                                        temperature=0.3)
                transcription_eng = self.processor.batch_decode(predicted_ids_eng, skip_special_tokens=True)

                full.append(transcription_eng[0])

        return ' '.join(full)
    
    
# example
# whisper = WhisperModel()
# result = whisper.process_sample('path to audiofile') # будет транскрибированная речь, говорить можно на любом (практически) языке, транскрибация производится на русский