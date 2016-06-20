---
layout: post
title: Where is 'core_resource' in Magento 2?
description: Where did the table 'core_resource' go to in Magento 2?
categories: articles
date: 2016-06-20
tags: [Magento 2, CLI, MYSQL]
keywords: [core_resource, setup_module, magento 2]
image:
---

In `Magento 1`, the `core_resource` table listed all of the installed modules in their versions.

Well that table is gone in `Magento 2`, because their data architecture was completely re-architected

## **Where did the "core_resource" table go to in Magento 2**

The same table exists in M2, but has a different name.

```Shell
setup_module
```

It has the exact same purpose and almost identical schema.

### **If you need to delete a module's install, or reset the module version to re-run an install script, do it in the "setup_module" table.**