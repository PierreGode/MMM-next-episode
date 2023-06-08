# MMM-next-episode
Magic mirror module for TV shows and movies with next-episode. Track the TV show and movies you watch.

![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/2068e6ba-579a-44aa-8c66-27d77275ab6e)
![image](https://github.com/PierreGode/MMM-next-episode/assets/8579922/42a303f1-5998-42f9-93a5-653f55819eab)



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
    displaySeasonAndEpisode: true
  }
},
```
