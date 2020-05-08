# muCrypt
*μCrypt Messenger: A secure & simple end-to-end encrypted chat*
![screenshot](screenshot.png)

## Requirements (Server)
* Python 3
* Python websockets
* Python ssl
* Python asyncio

## Requirements (Client)
* Any modern web browser

# How to use
* Install dependancies: `pip3 install websockets asyncio ssl`
* Clone the repo: `git clone https://github.com/connor-brooks/muCrypt.git`
* Created dir: `mkdir /var/www/muCrypt`
* Copy client: `cp muCrypt/client/* /var/www/muCrypt`
* Run server: `nohup ./muCrypt/server/server.py`
