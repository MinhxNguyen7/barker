cluster_dic = {
    "police":["police", "shooting", "injury"],
    "trump":["trump"],
    "MAGA":["trump"],
    "killed":["shooting", "death", "injury"],
    "court":["interior", "screen"],
    "killing":["shooting", "death", "interior", "injury", "gun"],
    "arrested":["police", "screen", "injury"],
    "shot":["shooting", "death", "police", "injury", "gun"],
    "shooting":["shooting", "death", "police", "injury", "gun"],
    "death":["death", "police", "interior"],
    "deadly":["death", "shooting", "police", "interior"],
    "officer":["police", "shooting", "screen"],
    "dead":["death"],
    "crash":["death", "exterior", "injury"],
    "teen":["interior"],
    "gun":["gun"],
    "murder":["interior", "death", "police", "gun", "exterior", "shooting"],
    "injured":["injury"],
    "court":["screen"],
    "charged":["screen"]
}

category_dic = {
    "police":["Police_Van"],
    "shooting":["School_Bus", "Police_Van", "Fire_Truck"],
    "injury":["Strecher", "Syringe"],
    "trump":["Trump"],
    "death":["Strecher", "Police_Van"],
    "interior":["File_Cabinet", "Library", "Stage"],
    "exterior":["minivan", "Moped", "Mosque", "Church", "Streetsign"],
    "gun":["Revolver", "Rifle"],
    "screen":["Website"],
    "random":["AttnGAN"],
    "comic":["Comic"]
}


import numpy as np
import re

def fetchImg(tweet_txt: str):
    RAND_PROB = 0.08
    SCREEN_PROB = 0.02
    COMIC_PROB = 0.02

    def chooseRand(inp:list):
        assert type(inp) is list

        if len(inp) > 1:
            return inp[np.random.randint(0, len(inp))]
        elif len(inp) == 1:
            return inp[0]
        else:
            return None

    tweet_txt = tweet_txt.lower()
    category_name = None

    common_word = chooseRand(list(set(re.findall(r"\w+|[^\w\s]", tweet_txt, re.UNICODE)).intersection(cluster_dic.keys())))

    if common_word is not None: # if contain words
        cluster_name = chooseRand(cluster_dic[common_word])
        category_name = chooseRand(category_dic[cluster_name])

        return category_name

    else: # if not, do random probability
        category_name = []

        if np.random.rand() < RAND_PROB:
            category_name.append(category_dic["random"][0])
        if np.random.rand() < SCREEN_PROB:
            category_name.append(category_dic["screen"][0])
        if np.random.rand() < COMIC_PROB:
            category_name.append(category_dic["comic"][0])

        return chooseRand(category_name)