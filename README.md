# MMM-next-episode

[Magic mirror](https://magicmirror.builders/) module for tracking TV shows and movies provided from 

[next-episode](https://next-episode.net/)

Track the TV shows and movies you watch.

Update your shows from the app 
for
[Apple](https://apps.apple.com/se/app/next-episode-track-tv-shows/id347009526)
and
[Android](https://play.google.com/store/apps/details?id=net.nextepisode.android&hl=en_US&pli=1)

____________________________________________________________________________________________________________

Magic mirror module:

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/15bb3c1f-11d7-42b2-bf5f-561e05367e28)  
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/e407db6b-bf51-4131-9846-47e97b6c96c5)




![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/8d1a397e-0e15-4e94-9895-c94debd2ad8a)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/b8fffcaf-2845-4398-bf5c-9c80bb5d1da8)



How to install:




```
cd MagicMirror/modules
```
```
git clone https://github.com/PierreGode/MMM-next-episode.git
```
```
cd MMM-next-episode
```
```
npm install
```
required dependencies
```
npm install request
npm install qrcode
npm install uuid
```
In MagicMirror/config/config.js
```
{
  module: "MMM-next-episode",
  position: "bottom_right",
  header: "Next-Episode",
  config: {
    id: '',
    hash_key: '',
    displaySeasonAndEpisode: false,
    maxdays: 7,
    ShowThumbnail: true,
    ThumbnailSize: 'small',
    updateInterval: 180
},
```

<h4>How to get your id and hash_key</h4>

When starting the module the first time without id and hash_key in the config, a QR code will be displayed on the mirror<p></p>

Example:

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/4680580b-c497-4a8e-8c04-37b3d62852b7)

Scan the QR code from your mirror and a empy page will show. <h4>NOTE! Edit the link and replace USERNAME and PASSWORD</h4> On your device you have scanned the qr code with, edit the link and change Only: USERNAME and PASSWORD with your login information for next-episode to get id and hash. <p></p> They might come together as a one line but the first 9 digits are the id and the rest is the hash.
Note: Using special characters such as '+', '"', '^', '%', '$', '#', in your password can cause the link to break. You may consider temporarily changing your password for this purpose.

After adding values in  id: '' and hash_key: ''  in the config below, restart the magic mirror.

## Config description
| name | values | info |
| --- | --- | --- |
| `displaySeasonAndEpisode:` | true false | show or hide season and episode. |
| `maxdays:` | example: 300 |  Default 7 .  How many days in the future to show shows from. minimum 0 but will always show Today and the next day. |
|`ShowThumbnail`| true false | show thumbnail of show or movie |
|`ThumbnailSize`| small medium or large| change size of thumbnail |
|`updateInterval`| example: 180 | 180 is default to update avery 3 hours and is the lowest time allowed, set theUpdate interval in minutes |

Comming updates:
Change styles from config

Completed 

Developed and maintained by [Pierre Gode](https://github.com/PierreGode)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J2EARPK)

API is free, but feel free to support [next-episode](https://next-episode.net/)
<p></p>
Big thanks to SANTAH from [next-episode](https://next-episode.net/) for building API support and providing information for this module.

