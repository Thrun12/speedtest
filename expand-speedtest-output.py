import sys
import json
from datetime import datetime
import os

# create speedtests folder
if not os.path.exists('speedtests'):
    os.makedirs('speedtests')

# get input from bash pipe
input_stream = sys.stdin

# load it as json
data = json.load(input_stream)
data['download']['mbps'] = data['download']['bytes']/1024/1024;
data['upload']['mbps'] = data['upload']['bytes']/1024/1024;

# print the speedtest result
print(str(data['download']['mbps']) + "Mbps / " + str(data['upload']['mbps']) + "Mbps")

# create result file name
now = datetime.now()
date_time = now.strftime("%m-%d-%Y_%H:%M:%S")
file_name = "speedtests/speedtest-" + date_time + ".json"
data['real_timestamp'] = date_time

# write result to file
file = open(file_name, "w+")
file.write(json.dumps(data, indent=4, sort_keys=True))
file.close()

# add result file to speedtest registry
registry_file = open("speedtests/speedtest-registry", "a+")
registry_file.write(file_name + "\r\n")
registry_file.close()
