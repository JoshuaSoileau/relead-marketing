---
layout: post
title: "How to Change a Remote Name in Git"
date:   2015-06-07 6:01:23
categories: git
comments: true
---
I wanted to start contributing to someone else's repo.

So I did the good developer thing, and forked the repo, so I can create branches on my fork and `PR` them to the original.

But when I cloned my fork, it had set the remote name for the repo to `origin`.

I wanted to change that, because I like my remotes to be named after their authors (because in my dayjob, we have as many as a dozen different people with separate forks contributing to the same base repo).

So I changed the remote name from `origin` to `josh`.

## Use the `git remote rename` command to rename remotes (derh)

```Shell
git remote rename CURRENT_NAME NEW_NAME
```

So I ran this:

```Shell
git remote rename origin josh
```

Good practice is to rename the base repo `upstream`. This is the practice github follows, and you'll see this all over the place in places like [StackOverflow](http://stackoverflow.com/).

These examples are taken from [GitHub's awesome docs page](https://help.github.com/articles/renaming-a-remote/) on the same topic.

```Shell
git remote -v
# View existing remotes
origin  https://github.com/OWNER/REPOSITORY.git (fetch)
origin  https://github.com/OWNER/REPOSITORY.git (push)

git remote rename origin upstream
# Change remote name from 'origin' to 'upstream'

git remote -v
# Verify remote's new name
upstream  https://github.com/OWNER/REPOSITORY.git (fetch)
upstream  https://github.com/OWNER/REPOSITORY.git (push)
```

