---
layout: post
title: How to Implement a Bash Script to Create New Posts in Jekyll
description: How to use a bash script to automate creating new posts in jekyll, so you don't have to fill in the date every time!
categories: articles
date: 2016-06-08
tags: [jekyll bash]
keywords: [jekyll bash automate]
---

After using Jekyll to blog for a little while, it quickly becomes tedious to fill out the file naming conventions and YAML frontmatter for each post.

So I went about finding a way to make it easier.

I stumbled across [Katie Harron](https://pibby.com/)'s awesome [bash script](https://gist.github.com/pibby/6911493), which lets you run a command in terminal which prompts you for the frontmatter, and then autogenerates your new post file in the `_posts` directory.

Awesome!

I took that script and stuck it into a function in my `.zshrc` file, so now whenever I want to create a new posts, all I have to do is run

```Shell
new-post
```

Here's how to do the same (if you aren't uzing `zsh`, do the same in your `.bashrc` file).

# 1. Open your .zshrc file

```Shell
vim ~/.zshrc
```

# 2. Create a new function in that file

```Shell
new-post() {

}
```

# 3. Copy the [bash script](https://gist.github.com/pibby/6911493) from Katie Harron into that function

```Shell
new-post() {

    #!/bin/bash
    # Katie Harron - @pibby
    # This bash script will setup a new Jekyll blog post in Markdown and open it for editing in Sublime Text 2

    echo "Post Title: "
    read title
    echo "Post Description: "
    read desc
    echo "Post Tags: "
    read tags
    echo "Post Keywords: "
    read keyw
    echo "Banner image (bg_ .jpg): "
    read img

    ptitle=${title// /-}   # convert spaces in title to hyphens
    plc=`echo "$ptitle" | tr '[:upper:]' '[:lower:]'`   # convert title to lowercase
    pdate=`date +%Y-%m-%d` 	# create date as Year-Month-Date
    filename=~/Sites/katieharron/_posts/$pdate-$plc.md 	# location to create the new file as year-month-day-title.md
    touch $filename 	# create the new blank post

    echo "---
    layout: post
    title: $title
    description: $desc
    categories: articles
    date: $pdate
    tags: [$tags]
    keywords: [$keyw]
    image: $img
    ---" > $filename 	# fill out YAML Front Matter and insert into our new file

    /Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl $filename 	# open in Sublime Text 2 (Mac OS X)
}
```

# 4. Remove the unwanted pieces.
Maybe you don't want to fill in keywords for every post you do.

In my case, I just removed the comments at the beginning, and the last line, which opens the new file in Sublime Text 2.

I'm an Atom guy, and even then, I didn't want to open the post immediately anyways.

So I just removed that line entirely

```Shell
new-post() {
    echo "Post Title: "
    read title
    echo "Post Description: "
    read desc
    echo "Post Tags: "
    read tags
    echo "Post Keywords: "
    read keyw
    echo "Banner image (bg_ .jpg): "
    read img

    ptitle=${title// /-}   # convert spaces in title to hyphens
    plc=`echo "$ptitle" | tr '[:upper:]' '[:lower:]'`   # convert title to lowercase
    pdate=`date +%Y-%m-%d` 	# create date as Year-Month-Date
    filename=~/Sites/katieharron/_posts/$pdate-$plc.md 	# location to create the new file as year-month-day-title.md
    touch $filename 	# create the new blank post

    echo "---
    layout: post
    title: $title
    description: $desc
    categories: articles
    date: $pdate
    tags: [$tags]
    keywords: [$keyw]
    image: $img
    ---" > $filename 	# fill out YAML Front Matter and insert into our new file
}
```

# 5. Change the path for the `filename` variable to the path for your local Jekyll project

In my case, mine located at
```Shell
/Volumes/Sites/js.dev/
```

So it becomes

```Shell
new-post() {
    echo "Post Title: "
    read title
    echo "Post Description: "
    read desc
    echo "Post Tags: "
    read tags
    echo "Post Keywords: "
    read keyw
    echo "Banner image (bg_ .jpg): "
    read img

    ptitle=${title// /-}   # convert spaces in title to hyphens
    plc=`echo "$ptitle" | tr '[:upper:]' '[:lower:]'`   # convert title to lowercase
    pdate=`date +%Y-%m-%d` 	# create date as Year-Month-Date
    filename=/Volumes/Sites/js.dev/_posts/$pdate-$plc.md 	# location to create the new file as year-month-day-title.md
    touch $filename 	# create the new blank post

    echo "---
    layout: post
    title: $title
    description: $desc
    categories: articles
    date: $pdate
    tags: [$tags]
    keywords: [$keyw]
    image: $img
    ---" > $filename 	# fill out YAML Front Matter and insert into our new file
}
```

## And that's it!

Here's how it is used

```Shell
$ new-post
Post Title:
$ How to Implement a Bash Script to Create New Posts in Jekyll
Post Description:
$ How to use a bash script to automate creating new posts in jekyll, so you don't have to fill in the date every time!
Post Tags:
$ jekyll bash
Post Keywords:
$ jekyll bash automate
Banner image (bg_ .jpg):
$
```

Super simple, and saves tons of boring time.