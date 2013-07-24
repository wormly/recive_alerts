A simple NodeJS HTTP server to receive Wormly HTTP/RPC alerts 
https://www.wormly.com/help/channels/http-rpc

It writes them to ~/received_alerts/[hostid].json

It might work in conjunction with a cron task or daemon which will take action based on 
the contents of those alerts

The end point for your Wormly alerts are:
https://[yourserver]:[port]/wormlyalert

This daemon should run as an unprivileged user - and preferably behind an SSL 
proxy such as Nginx.
