import cv2
import time


chan = 1
cap = cv2.VideoCapture(f"rtsp://webstream:webstream2000@91.211.195.78:3125/cam/realmonitor?channel={chan}&subtype=0&1")

import requests

url = 'http://127.0.0.1:8000/process-video'

def send_video(filename, prompt):
    files = [('file', open(filename, 'rb'))]
    data = {"prompt": prompt}
    resp = requests.post(url=url, data=data, files=files) 
    print(resp.text)

send_video('video.mp4', 'man in wheelchair')

while True:
    cap = cv2.VideoCapture(f"rtsp://webstream:webstream2000@91.211.195.78:3125/cam/realmonitor?channel={chan}&subtype=0&1")

    while(cap.isOpened()):
        ret, frame = cap.read()
        #time.sleep(2)
        cv2.imshow(f'channel {chan}', frame)
        k = cv2.waitKey(1)
        if k == 27:
            break
    chan += 1
    cap.release()
    cv2.destroyAllWindows()

