---
layout: post
title: "What is does the TTL property do in XML in Magento 2"
date:   2015-06-07 9:01:23
categories: magento2 xml
comments: true
---

I ran across an interesting bit of XML in [Magento 2]() when I was learning about their XML & cacheing structure.

```XML
<referenceContainer name="page.top">
    <block class="Magento\Theme\Block\Html\Topmenu" name="catalog.topnav" template="html/topmenu.phtml" ttl="3600"/>
    <container name="top.container" as="topContainer" label="After Page Header Top" htmlTag="div" htmlClass="top-container"/>
    <block class="Magento\Theme\Block\Html\Breadcrumbs" name="breadcrumbs" as="breadcrumbs"/>
</referenceContainer>
```

Specifically, I was curious what "ttl" on a block level meant in M2.

```XML
<block ... name="catalog.topnav" ... ttl="3600"/>
```

TTL is obviously **time-to-live**, and is the amount of time before a cached asset becomes invalidated and needs to be reloaded.

But why is it a property on the block level in Magento 2?

Turns out, when a page request is made for a Magento 2 site, *only 95% of a page's content is loaded from the server in the initial page* request.

The other 5% is loaded by an AJAX request through [knockout.js.](http://knockoutjs.com/) (lots more posts on knockout in M2 coming soon)

Well, good luck finding more information on how that works, because Magento's developer docs don't cover it.

The 95% that is loaded by the server consists of lots & lots of individual blocks that combine to create the page's HTML, and those blocks can be cached.

## **In Magento 2, elements can be cached on a block level.**
My research led me to Alan Kent's kickass [blog post](https://alankent.me/2014/12/09/magento-2-caching-overview/) about M2 cacheing.

Individual blocks in M2's XML structure can be given individual expiration dates, by setting different TTL values on the block declarations.

Declaring a block like so:

```XML
<block ... name="catalog.topnav" ... ttl="3600"/>
```

Will create the block and give it a lifetime of 60 hours (`3600 seconds / 60 seconds`) on the server (note, this is completely separate from client side cacheing).

After that expiration period, the next request for that block will invalidate that cached block and generate a new one.

For more information on cacheing in Magento 2, check out Alan Kent's previously mentioned [awesome blog post](https://alankent.me/2014/12/09/magento-2-caching-overview/).