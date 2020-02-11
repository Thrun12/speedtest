import sys
import json
from datetime import datetime

input_stream = sys.stdin

data = json.load(input_stream)
data['download']['mbps'] = data['download']['bytes']/1024/1024;
data['upload']['mbps'] = data['upload']['bytes']/1024/1024;

print(str(data['download']['mbps']) + "Mbps / " + str(data['upload']['mbps']) + "Mbps")

now = datetime.now()
date_time = now.strftime("%m-%d-%Y_%H:%M:%S")
file_name = "speedtests/speedtest-" + date_time + ".json"

file = open(file_name, "w")
file.write(json.dumps(data, indent=4, sort_keys=True))
file.close()
