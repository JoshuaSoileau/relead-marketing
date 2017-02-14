---
layout: post
title: "\"Asymmetric transaction rollback.\" errors when saving product in Magento 2 "
date:   2015-06-06 6:01:23
categories: magento2 errors apache
comments: true
---

I got this error when trying to update a product in the admin, using a DB I took from a staging environment:

```
Asymmetric transaction rollback.
```

[This](http://magento.stackexchange.com/questions/110976/new-product-asymmetric-transaction-rollback-error) stackoverflow question led me to [this](http://magento.stackexchange.com/a/159650/36660) answer which solved my problem.

Turns out if you have Elasticsearch set as your search engine, you'll get this error on product save.

Go to:

```
Store->Configuration->Catalog->Catalog->CatalogSearch->Search Engine
```

And change it to `MySql`.

You should now be able to save products correctly.
