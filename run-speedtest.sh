echo "Running speedtest..."
current_time=$(date "+%Y.%m.%d-%H.%M.%S")
#file_name="speedtests/speedtest-${current_time}.json"
#speedtest -s 15250 -f json-pretty | { while read -r line; do echo "$line" >> file_name; done }
speedtest -s 15250 -f json-pretty | python expand-speedtest-output.py
echo "Speedtest done."
