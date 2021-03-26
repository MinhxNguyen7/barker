from twitter_clone_backend.models import Tweet, Poster

import numpy as np
import pandas as pd

"""
Note: Functions must be run through the manage.py shell
"""


def tweet_txt_to_np(
        fp: str,
        separator = "\n===================="
    ):
    """
    Converts txt output of GPT-2 into a numpy list of strings
    """

    df = pd.read_csv(
        fp,
        encoding="latin_1",
        error_bad_lines=False,
        header=None,
        names=["text"],
        sep=separator
    )

    arr = np.squeeze(df[df['text'] != "===================="].values)

    return arr


def format_tweets(input_arr, remove_rt=True, remove_links=True):
    """
    Takes list or numpy array of tweets and formats them
    """

    output = []

    for tweet in input_arr:
        words = tweet.split(" ")  # split tweet into words

        # if it's a retweet, remove the RT label
        if remove_rt:
            while words[0].startswith("RT"):
                words = words[2:]

        # remove links
        if remove_links:
            words = [word for word in words if "https:" not in word]

        # join everything back together
        tweet = " ".join(words)

        # remove stray tokens
        tweet.replace("<|startoftext|>", "")

        # trims tweet to proper length
        if len(tweet) > 140:
            tweet = tweet[:141]

        output.append(tweet)

    return np.asarray(output)


def tweets_list_to_poster(tweets, poster_name: str):
    """
    loads every tweet in list into a tweet of the poster in db

    :param tweets: list of tweets
    :param poster_name: username of poster
    """

    for text in tweets:
        tweet = Tweet()
        poster = Poster.objects.get(username=poster_name)
        tweet.poster = poster
        tweet.text = text
        tweet.save()
        print(f'saved to {poster.username}: \n{tweet.text}\n==========')


def load_tweets_to_db(tweets_txt: str, poster_name: str):
    assert tweets_txt.endswith(".txt")

    tweets = format_tweets(tweet_txt_to_np(tweets_txt))
    tweets_list_to_poster(tweets, poster_name)

