---
layout: post
title: "(unknown): did not find expected key while parsing a block mapping at line 2 column 1"
description: Resolving issues with YAML frontmatter on jekyll post that cause errors on compilation.
date: 2016-06-08
tags: [ jekyll, YAML ]
keywords: [ jekyll, YAML ]
---

I tried using [Katie Harron](https://pibby.com/)'s awesome [bash script](https://gist.github.com/pibby/6911493) for creating new Jekyll posts, but when I tried to compile, I kept getting a cryptic error

```Shell
(<unknown>): did not find expected key while parsing a block mapping at line 2 column 1
```

Turns out I had an error in my YAML frontmatter for the post

```Shell
---
layout: post
title: Loading CSS Assets Through PHP in Magento 2
description: How to use an asset repository object to load CSS or script assets through PHP in Magento 2
categories: articles
date: 2016-06-08
tags: php [magento 2]
keywords: [asset repository] [magento 2]
---
```

Can you see it?

# The syntax for my `tags` and `keywords` is all wrong.

I stupidly assumed closed braces `[]`, were for allowing you to use tags will multiple words.

You can do that in jekyll, but not the way I did it.

I needed to change this syntax

```Shell
tags: php [magento 2]
keywords: [asset repository] [magento 2]
```

to this

```Shell
tags: [php, magento 2]
keywords: [asset repository, magento 2]
```

I glossed right over the very obvious fact that it's a freaking array, and you pass the value for `tags` and `keywords` as an array.

Confusing, since the error message told me to look at `line 2`, which had absolutely nothing to do with the issue.

I suppose it's because line 2 is the start of the YAML frontmatter, and my error was in that section of the post, and so it couldn't parse the frontmatter, and spit back the line denoting the starting position of it.

## If you get this area, you have an error (probably syntax) in your YAML frontmatter.