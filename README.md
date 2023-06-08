# MMM-next-episode
<p></p>

<h4>NEW PROJECT, BETA.</H4>
please Create tickets or pull request.

<p></p>
Magic mirror module for TV shows and movies with next-episode. <p></p>
Track the TV show and movies you watch.

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/38e955a4-a156-4ef8-8b67-6e0b93e0645c)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/08f59252-8a0c-4d29-8d6f-716336204fb3)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/506c098c-145a-427e-8927-f86cd97cfa5b)





How to install:<p></p>



```
cd MagicMirror/modules
```
```
git clone https://github.com/PierreGode/MMM-next-episode.git
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

How to get your id and hash_key<p></p> 
when starting the module the first time without id and hash_key in the config an QR code will be generated<p></p>
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/ab96c625-9836-4840-b313-6e3e3c0f13d7)
<p></p>
Scan the QR code and a empy page will show. <h4>NOTE! Edit the link and replace USERNAME and PASSWORD</h4> with your login to get id and hash. they might come together a one line but the first 9 digits are the id and the rest the hash.
Note: Using special characters such as '+', '"', '^', '%', '$', '#', in your password can cause the link to break. You may consider temporarily changing your password for this purpose.
<p></p>
After adding values in  id: '' and hash_key: ''  in the config below, restart the magic mirror.

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
    maxdays: 7 
  }
},
```
Config description
| name | values | info |
| --- | --- | --- |
| displaySeasonAndEpisode: | true false | show or hide season and episode. |
| maxdays: | 300 0  |  Default 7 .  How many days in the future to show shows from. minimum 0 but will always show Today Tomorrow. |


Big thanks to SANTAH from https://next-episode.net/ for building api support and providing information for this module.
