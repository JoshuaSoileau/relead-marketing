---
layout: post
title: The Workflow for Making XML Changes on Magento 2's Frontend
description: How to make changes to existing layout XML files and how to replace existing layout XML files altogether.
categories: articles
date: 2016-06-08
tags: [magento 2, xml, layout]
keywords: [magento 2, xml, layout, extend, override]
image:
---

One of the hardest parts of changing from developing Magento 1 to Magento 2 is that the workflow and file structures are very different.

In Magento 1, if you wanted to make an XML change, you could place it in your theme or module's XML file, and reference a page layout handle (ex. `cms_index_index`) and make changes inside that handle.

It would be something like this

```Shell
# Magento 1
# File: app/design/frontend/My_Package/My_Theme/layout/local.xml
<?xml version="1.0"?>

<layout version="0.1.0">
    <cms_index_index>
        <reference name="content">
            <remove name="report.bugs" />
        </reference>
    </cms_index_index>
</layout>
```

So you're XML files become these massive collection of layout handles that make changes to individual pages.

That workflow is no longer applicable in Magento 2.

In M2, you no longer reference page update handles *inside* your XML, **the reference handle becomes the file name**.

Now, instead of making changes in local.xml, you would look for a file whose name is referencing the page layout handle you want.

I would find this file

```Shell
vendor/magento/module-cms/view/frontend/layout/cms_index_index.xml
```

Which looks like this

```Shell
<?xml version="1.0"?>

<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body/>
</page>
```

Let's say I want to make changes to this page.

## How to **CHANGE** this XML file
If I have an XML file that I want to make *just a few minor changes*, then you can create a new file that will be **merged** with the one listed above.

This is the recommended way to change XML.

To do this, create a new file with the same name under your `theme/layout` folder.

```Shell
app/design/frontend/My_Namespace/My_Theme/layout/cms_index_index.xml
```

And make your changes inside of there

```Shell
<?xml version="1.0"?>

<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="report.bugs" remove="true"/>
    </body>
</page>
```

Since you've named the file the same as the original, using the page layout name, these files will be merged and concatenated, and the XML will be combined.

This same thing applies for the module directories. Find the original you want to edit, place it in your module's layout folder, name it the same thing.

## How to **REPLACE** this XML file with a new one

If you want to make drastic changes to an XML file, you can replace an existing XML file completely.

To accomplish this, create a new file, with the same name (`cms_index_index.xml`) in your `<theme_dir>/<vendor>_<module>/layout/override/base` directory.