import time
import sys
import random

def typewriter(text, speed):
    delay = []
    for i in text:
        delay.append(random.randint(1,9))
    for char,d in list(zip(text,delay)):
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(d/speed)

  