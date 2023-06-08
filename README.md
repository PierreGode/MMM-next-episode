# MMM-next-episode
Magic mirror module for TV shows and movies with next-episode. Track the TV show and movies you watch.

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/76f66a5c-de00-4c96-9d25-394134ab00a4)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/3d64fe49-de97-4672-b760-865f6e0db14e)



NEW PROJECT, NOT WORKING.

How to install:<p></p>
get your id and hash_key with this link https://next-episode.net/api/magicmirror/v1/services.php?service=link&device_id=FIGURING_THIS_OUT&username=USERNAME&password=PASSWORD
replace USERNAME and PASSWORD

```
cd MagicMirror/modules
```
```
git clone https://github.com/PierreGode/MMM-next-episode.git
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
