from twitter_clone_backend.models import Tweet, Poster, Explanation

import numpy as np
import pandas as pd
import os
from charset_normalizer import CharsetNormalizerMatches as CnM

"""
Note: Functions must be run through the manage.py shell
"""


def tweet_txt_to_np(
        fp: str,
        separator="\n====================",
        normalize_encoding=True
    ):
    """
    Converts txt output of GPT-2 into a numpy list of strings
    """

    encoding = None
    if normalize_encoding:
        cnm = CnM.normalize(fp) # normalize the encoding
        encoding = cnm.encoding
        fp = append_before_ext(fp, "-"+encoding) # select the normalized text

    df = pd.read_csv(
        fp,
        encoding=encoding,
        error_bad_lines=False,
        header=None,
        names=["text"],
        sep=separator
    )

    if normalize_encoding:
        os.remove(fp) # delete the normalized text file (if enabled)

    arr = np.squeeze(df[df['text'] != "===================="].values)

    return arr


def format_tweets(input_arr, remove_rt=True, remove_links=True):
    """
    Formats array-like of tweets. Not inline

    :param input_arr: array-like of tweets
    :param remove_rt: whether to remove the "RT {username}:" labels; doesn't always work
    :param remove_links: whether to remove links; doesn't always work
    :return: python list of processed tweets
    """

    output = []

    for _tweet in input_arr:
        tweet = _tweet
        words = tweet.split(" ")  # split tweet into words

        # if it's a retweet, remove the RT label
        if remove_rt:
            while words[0].startswith("RT"):
                words = words[2:]

        # remove links
        # TODO: Make this work
        if remove_links:
            words = [word for word in words if ("https:" not in word) or ("http:" not in word)]

        # join everything back together
        tweet = " ".join(words)

        # remove stray tokens
        tweet.replace("<|startoftext|>", "")

        # only save if formatted tweet is short enough
        if len(tweet) < 141:
            output.append(tweet)

    return np.asarray(output)


def save_tweets_list(tweets, poster_name: str, explanation_name: str = None):
    """
    Loads every tweet in list into a tweet of the poster in db

    :param tweets: list of tweets
    :param poster_name: username of poster
    :param explanation_name: name/pk of explanation
    """

    for text in tweets:
        tweet = Tweet()  # new Tweet instance
        poster = Poster.objects.get(username=poster_name)

        if explanation_name is not None:
            explanation = Explanation.objects.get(name=explanation_name)
            tweet.explanation = explanation

        tweet.poster = poster
        tweet.text = text

        tweet.save()
        print(f'saved to {poster.username}: \n{tweet.text}\n==========')


def append_before_ext(filename: str, addition: str):
    """
    Appends a string before the extension
    Example: append_before_ext("file.txt", "_a") -> "file_a.txt"

    :param filename: original filename
    :param addition: string to add
    :return: new filename
    """
    name, ext = os.path.splitext(filename)
    return "{name}{add}{ext}".format(name=name, add=addition, ext=ext)


def load_tweets_to_db(tweets_txt: str, poster_name: str, explanation_name: str):
    assert tweets_txt.endswith(".txt")

    tweets = format_tweets(tweet_txt_to_np(tweets_txt))
    save_tweets_list(tweets, poster_name, explanation_name)
