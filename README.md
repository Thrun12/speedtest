# Simplified speedtest
This uses speedtest.net to store speedtests and easily set it up for you.

## Web interface setup
This Simplified speedtest also comes with a web service to get a better overview over the data.
To start the service run the following commands.

```
$ npm install
```

This will setup everything no need for the steps below.

Now run the following command.

```
$ npm start
```

Now you can access the web interface at http://localhost:6969. The server will run a speedtest every hour and one on server startup.

## Minimal Setup
Run the speedtest-cli-setup script by running the following command in the terminal.

```
$ bash speedtest-cli-setup.sh
```

## Running a speedtest
You can make a speedtest by running the following command in the terminal.

```
$ bash run-speedtest.sh
```

This will run the speedtest and store the json result in the speedtest folder.
