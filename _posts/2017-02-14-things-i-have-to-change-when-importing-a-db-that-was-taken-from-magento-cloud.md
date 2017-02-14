---
layout: post
title: Things I have to change when importing a DB that was taken from Magento Cloud
description: Things I have to change when importing a DB that was taken from Magento Cloud
categories: articles
date: 2017-02-14
tags: [magento2, magento cloud]
keywords: [magento 2, magento cloud, database]
image:
---

1. Update base urls in `core_config_data`, `web/unsecure/base_url` and `web/secure/base_url`.
2. Update media urls in `core_config_data`, `web/unsecure/base_media_url`, and `web/secure/base_media_url`.
3. Update base link urls in `core_config_data`, `web/unsecure/base_link_url`.
4. Turn off CSS merging and minification, `dev/css/merge_css_files`, `dev/css/minify_files`.
5. Turn off JS merging and minification, `dev/js/merge_files`, `dev/js/minify_files`.
6. Turn of static file signing, `dev/static/sign`.
7. Change search engine to MySql, `catalog/search/engine` => `mysql`.
