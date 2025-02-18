import cv2
import time

cam_ip = '0.0.0.0:5'

chan = 1
cap = cv2.VideoCapture(f"rtsp://webstream:webstream2000@{cam_ip}/cam/realmonitor?channel={chan}&subtype=0&1")

import requests

url = 'http://127.0.0.1:8000/process-video'


def send_video(filename, prompt):
    files = [('file', open(filename, 'rb'))]
    data = {"prompt": prompt}
    resp = requests.post(url=url, data=data, files=files) 
    print(resp.text)


send_video('video.mp4', 'man in wheelchair')

while True:
    cap = cv2.VideoCapture(f"rtsp://webstream:webstream2000@{cam_ip}/cam/realmonitor?channel={chan}&subtype=0&1")

    while(cap.isOpened()):
        ret, frame = cap.read()
        cv2.imshow(f'channel {chan}', frame)
        k = cv2.waitKey(1)
        if k == 27:
            break
        
    chan += 1
    cap.release()
    cv2.destroyAllWindows()

