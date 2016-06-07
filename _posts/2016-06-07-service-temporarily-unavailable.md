---
layout: post
title: "How to Fix Service Temporarily Unavailable in Magento 2"
date:   2015-06-07 6:01:23
categories: magento2 errors mysql
comments: true
---

Booted up my computer this morning and went to load a local Magento 2 site, got an error message `Service Temporarily Unavailable`.

![Service Temporarily Unavailable]({{ site.url }}/images/service-temporarily-unavailable.png)

Turns out it was as simple as mysql server not running.

Confusing, since Magento 1 gave you a more helpful `MYSQL server has gone away` message.

Anyways, the solution was simply to start it.

# 1. Start MYSQL server.

 Open a terminal and run:

```console
mysql.server start
```
# 2. Delete `.maintenance.flag`, if it exists.

Check in your root M2 directory, for a file `var/.maintenance.flag`. This file is created when there are errors and the site should not be shown. Simply delete the file.

```console
rm -f var/.maintenance.flag
```

That's it.