import picamera

camera = picamera.PiCamera()
camera.brightness = 60
camera.capture('image.jpg')
