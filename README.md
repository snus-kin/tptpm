# Twitter Public to Private Message Link Generator

The link produced by this website can be pasted in a tweet to create a badge
that directs people to message you.

I created this website as the feature is fairly obscure, and twitter direct you
to download your entire twitter archive to get your ID.

As far as I know, this is the only official public-facing documentation:

[Moving from a public Tweet to a private conversation](https://business.twitter.com/en/help/campaign-editing-and-optimization/public-to-private-conversation.html)


## Details
This is a simple implementation of the tptpm site I made in nim before using
node and React. 

The node server has rate-limiting and caching, so hopefully there shouldn't be
any problems with twitter rate limiting anything. This acts essentially as a very simple lookup for twitter IDs from username.

The React front-end is where the link is built and displayed, overall there is no real magic here, just URL parameter construction.

## Things That would be Nice
* [ ] Client-side caching (would just avoid any superfluous requests)
* [ ] Automatic updating on changes of either box (i.e. no 'submit' button)

## Deployment
* TBC