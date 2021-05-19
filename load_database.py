from twitter_clone_backend.models import Tweet, Poster, Explanation, Article

import numpy as np
import pandas as pd
import os
from time import time
from charset_normalizer import CharsetNormalizerMatches as CnM

"""
Note: Functions must be run through the manage.py shell
Activate by calling "python manage.py shell" in environment prompt
"""


def tweet_txt_to_np(
        fp: str,
        separator="\n====================",
        normalize_encoding=True
):
    """
    Converts txt output of GPT-2 into a numpy list of strings
    """

    encoding = 'utf-8'
    if normalize_encoding:
        cnm = CnM.normalize(fp)  # normalize the encoding
        encoding = cnm.encoding
        fp = append_before_ext(fp, "-" + encoding)  # select the normalized text

    df = pd.read_csv(
        fp,
        encoding=encoding,
        error_bad_lines=False,
        header=None,
        names=["text"],
        sep=separator
    )

    if normalize_encoding:
        os.remove(fp)  # delete the normalized text file (if enabled)

    arr = np.squeeze(df[df['text'] != "===================="].values)

    return arr


def format_tweets(input_arr, remove_rt=True, remove_links=True, take_longs=True, min_length = 10):
    """
    Formats array-like of tweets. Not inline

    :param input_arr: array-like of tweets
    :param remove_rt: whether to remove the "RT {username}:" labels; doesn't always work
    :param remove_links: whether to remove links; doesn't always work
    :param take_longs: whether to take long tweets (after shortening). False discards the Tweet
    :param min_length: minimum length for tweet to be saved
    :return: python list of processed tweets
    """

    output = []

    for idx, _tweet in enumerate(input_arr):
        tweet = _tweet
        words = tweet.split(" ")  # split tweet into words

        try:
            # if it's a retweet, remove the RT label
            if remove_rt:
                while words[0].startswith("RT"):
                    words = words[2:]

            # remove links
            if remove_links:
                new_words = []
                for word in words:
                    if "http" not in word:
                        new_words.append(word)
                words = new_words

            # join everything back together
            tweet = " ".join(words)

            # remove stray tokens; doesn't seem to work
            tweet = tweet.replace("<|startoftext|>", "")

            
            length = len(tweet)
            if length >= min_length: # not too short
                if length < 141: # only save if formatted tweet is short enough
                    output.append(tweet)
                # if take_longs is True, save the first 140 characters
                elif take_longs:
                    output.append(tweet[:140])
        except Exception as e:
            print(f"Exception occurred formatting tweet[{idx}]: {e}")

    return output


def save_tweets_list(tweets, poster_name: str, explanation_name: str = None):
    """
    Loads every tweet in list into a tweet of the poster in db

    :param tweets: list of tweets
    :param poster_name: username of poster
    :param explanation_name: name/pk of explanation
    """

    for idx, text in enumerate(tweets):
        tweet = Tweet()  # new Tweet instance
        poster = Poster.objects.get(username=poster_name)

        if explanation_name is not None:
            explanation = Explanation.objects.get(name=explanation_name)
            tweet.explanation = explanation

        tweet.poster = poster
        tweet.text = text

        tweet.save()
        print(f'saved to {poster.username}: \n{tweet.text}\n====={idx:05}/{len(tweets):05}=====')


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


def load_tweets_to_db(
    tweets_txt: str, poster_name: str, explanation_name: str, 
    separator="\n====================", 
    remove_rt=True, remove_links=True, take_longs=True, min_length = 10, normalize_encoding=True
    ):
    """
    Full wrapper for loading tweets from .txt to DB

    Example: load_database.load_tweets_to_db(
        "data.txt", "random: left", "GPT2-LeftTroll", "\n")
    """
    start = time()

    assert tweets_txt.endswith(".txt")
    format_kwargs = dict(
        remove_rt=remove_rt, remove_links=remove_links, take_longs=take_longs, min_length = min_length
    )

    tweets = format_tweets(
        tweet_txt_to_np(tweets_txt, separator=separator, normalize_encoding=normalize_encoding),
        **format_kwargs)
    save_tweets_list(tweets, poster_name, explanation_name)

    end = time()
    print(f"Loaded {len(tweets)} Tweets in {end-start} seconds")


def tweet_parse_test(
    tweets_txt: str, separator="\n====================", 
    remove_rt=True, remove_links=True, take_longs=True, min_length=10, normalize_encoding=True):
    """
    Dry-run, of sorts, to check if formatting and delimitation works
    """
    assert tweets_txt.endswith(".txt")

    format_kwargs = dict(
        remove_rt=remove_rt, remove_links=remove_links, take_longs=take_longs, min_length = min_length
    )

    for tweet in format_tweets(
        tweet_txt_to_np(tweets_txt, separator=separator, normalize_encoding=normalize_encoding),
        **format_kwargs
        ):
        print(tweet)

######################################## News stuff ########################################
def news_processing(
  fp: str,
  separator="\n===================="
  ):
  # Load articles values into df and remove delimiters
  df = pd.read_csv(fp, sep=separator, names=['article'], dtype="str")
  df = df.loc[df.article!="====================", :]

  # remove some tags
  articles = []
  for a in df.article:
    article = a
    article = article.replace("(CNN)", "")
    article = article.replace("<|startoftext|>", "")
    articles.append(article)

  return articles


def load_news_to_db(tweets_txt: str, poster_name: str, explanation_name: str):
    articles = news_processing(tweets_txt)

    for a in articles:
        article = Article()
        tweet = Tweet()

        article.text = a
        article.source = explanation_name
        article.save()
        tweet.poster = Poster.objects.get(pk=poster_name)
        tweet.article = article
        tweet.explanation = Explanation.objects.get(pk=explanation_name)
        tweet.text = "news from "+tweet.explanation.pk
        tweet.save()
