---
layout: post
title: Translations in Template Files in Magento 1 vs Magento 2
description: How to handle translations in Magento 2.
categories: articles
date: 2016-06-27
tags: [magento 2, translations, phtml]
keywords: [magento 2, translations, phtml]
image:
---

In Magento 1, in a `.phtml` file, you could use the double underscore `__` syntax, with the `this` keywords (which referenced the block you were in) to make your text translatable.

In Magento 2, the syntax is similar, but there is no reference to the block you're in.

### **Magento 1 PHP Translations** look like this
```Shell
<?php echo $this->__("Quantity"); ?>
```

### **Magento 2 PHP Translations** look like this
```Shell
<?php echo __("Quantity"); ?>
```

The only difference is you remove the reference to `this`.

---
&nbsp;

p.s. It's worth noting that `this` does not reference the same thing in a Magento 2 template file as it does in a Magento 1 template file.

In M2, instead of referencing the block you are inside of, `this` references the templating engine. To access the block, use the implicitly declared variable `$block`.