# MMM-next-episode
Magic mirror module for TV shows and movies with next-episode. Track the TV show and movies you watch.

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/38e955a4-a156-4ef8-8b67-6e0b93e0645c)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/08f59252-8a0c-4d29-8d6f-716336204fb3)




NEW PROJECT, NOT WORKING.

How to install:<p></p>
Get your id and hash_key with this link 
<p></p>
https://next-episode.net/api/magicmirror/v1/services.php?service=link&device_id=FIGURING_THIS_OUT&username=USERNAME&password=PASSWORD
<p></p>
replace USERNAME and PASSWORD

```
cd MagicMirror/modules
```
```
git clone https://github.com/PierreGode/MMM-next-episode.git
```
```
npm install
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
    displaySeasonAndEpisode: true // options: true / false
  }
},
```
Big thanks to SANTAH from https://next-episode.net/ for building api support and providing information for this module.
