maps_list = [
  "Ascent",
  "Split",
  "Fracture",
  "Bind",
  "Breeze",
  "District",
  "Kasbah",
  "Drift",
  "Piazza",
  "Abyss",
  "Lotus",
  "Sunset",
  "Basic Training",
  "Pearl",
  "Icebox",
  "The Range",
  "Haven"
]

agent_list = [
  "Gekko",
  "Fade",
  "Breach",
  "Deadlock",
  "Raze",
  "Chamber",
  "KAY/O",
  "Skye",
  "Cypher",
  "Sova",
  "Sova",
  "Killjoy",
  "Harbor",
  "Viper",
  "Phoenix",
  "Astra",
  "Brimstone",
  "Iso",
  "Clove",
  "Neon",
  "Yoru",
  "Sage",
  "Reyna",
  "Omen",
  "Jett"
]

import os 
from pytube import Search
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
client = MongoClient(os.getenv("MONGO_URL"))
db = client['valorant_db']
collection = db['lineups']
for agent in agent_list:
    for map in maps_list:
        lineupList = []
        s = Search(f"{agent} {map} lineups")
        for item in s.results:
            lineupList.append(item.watch_url)

        collection.insert_one({
            'agent' : agent,
            'map' : map,
            'lineups_videos' : lineupList
        })


# sample response
# {'_js': None, '_js_url': None, '_vid_info': None, '_watch_html': None, '_embed_html': None, '_player_config_args': None, '_age_restricted': None, '_fmt_streams': None, '_initial_data': None, '_metadata': None, 'video_id': 'K0DRiro-CYU', 'watch_url': 'https://youtube.com/watch?v=K0DRiro-CYU', 'embed_url': 'https://www.youtube.com/embed/K0DRiro-CYU', 'stream_monostate': <pytube.monostate.Monostate object at 0x000002338903FB00>, '_author': 'Snapiex', '_title': 'SOVA LINEUPS BIND - VALORANT', '_publish_date': None, 'use_oauth': False, 'allow_oauth_cache': True}