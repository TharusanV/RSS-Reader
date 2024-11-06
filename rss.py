import feedparser

def fetch_rss_data(rss_url):
    """
    Purpose: Fetches and parses data from the given RSS URL.
    Parameters: rss_url (str): The RSS feed URL to connect to.
    Returns: A dictionary containing feed metadata and entries if successful, or an error message.
    """
    try:
        # Parse the RSS feed URL
        newsfeed = feedparser.parse(rss_url)

        #checkForKeys = feed.entries[0].keys()
        #return checkForKeys

        # Check if the feed is valid by looking for an error status
        if newsfeed.bozo:  # 'bozo' is True if there's a parsing error
            return {"error": "Failed to parse RSS feed. Invalid feed format or inaccessible URL."}

        # Check if the feed contains entries
        if not newsfeed.entries:
            return {"error": "No entries found in the RSS feed. Please check the URL or feed content."}

        # dictionary object - Extract useful information: feed title, link, and entries
        feed_data = {}
      
        if 'title' in newsfeed.feed:
            feed_data["title"] = newsfeed.feed.title
        else:
            feed_data["title"] = "No title"

        if 'link' in newsfeed.feed:
            feed_data["link"] = newsfeed.feed.link
        else:
            feed_data["link"] = "No link"

        feed_data["entries"] = []

        # Parse entries (e.g., article title, link, and description)
        for entry in newsfeed.entries:
            feed_data["entries"].append({
                "title": entry.title if 'title' in entry else 'No title',
                "link": entry.link if 'link' in entry else 'No link',
                "summary": entry.summary if 'summary' in entry else 'No summary'
            })

        return feed_data

    except Exception as e:
        return {"error": f"An error occurred while fetching the RSS feed: {e}"}

# Example usage:
rss_url = "https://feeds.bbci.co.uk/news/rss.xml"  # Example BBC News RSS feed
rss_data = fetch_rss_data(rss_url)
print(rss_data)
