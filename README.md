# MMM-next-episode
Magic mirror module for TV shows and movies with next-episode. Track the TV show and movies you watch.

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/38e955a4-a156-4ef8-8b67-6e0b93e0645c)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/08f59252-8a0c-4d29-8d6f-716336204fb3)




NEW PROJECT, NOT WORKING.

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
scan the QR code and you will an empy page. edit the link and replace USERNAME and PASSWORD with your login to get id and hash. they might come together a one line but the first 9 digits are the id and the rest the hash.

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
Big thanks to SANTAH from https://next-episode.net/ for building api support and providing information for this module.
