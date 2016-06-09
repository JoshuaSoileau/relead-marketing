---
layout: post
title: Composer Install Invalid Credentials Errors on Magento 2
description: How to fix errors saying 'Invalid credentials' when you run 'composer install' in Magento 2
categories: articles
date: 2016-06-09
tags: [magento 2, composer]
keywords: [magento 2, compose]
image:
---

I recently tried to re-download all of the modules in my magento installation to fill in the `vendor` directory.

I ran

```Shell
cd /path/to/magento2/root;
composer install;
```

It worked until it got to a module called `magento/module-sales-archive (100.0.2)`

Then I got this error

```Shell
[Composer\Downloader\TransportException]                                                                                                        
Invalid credentials for 'https://repo.magento.com/archives/magento/module-sales-archive/magento-module-sales-archive-100.0.2.0.zip', aborting.  
```

This is because this module requires developer creds to download it.

## The username &amp; password in your auth.json file are incorrect.

In your Magento 2 `root` directory, there should be a file called `auth.json` (if it isn't there, create it).

And it's contents should look like this:

```Shell
{
  "http-basic": {
    "repo.magento.com": {
      "username": "HASHED_USERNAME",
      "password": "HASHED_PASSWORD"
    }
  }
}
```

You need to generate a new username and PW.

## Get new credentials from the Magento 2 marketplace

Go [here](http://devdocs.magento.com/guides/v2.0/install-gde/prereq/dev_install.html#instgde-prereq-compose-clone) and log in.

If you don't have an account, create one.

Navigate to your `My Account` dashboard.

![My Account Dropdown]({{ site.url }}/images/my-account-dropdown.png)

Then navigate to `My Access Keys` in the bottom left of the dashboard.

![My Account Dropdown]({{ site.url }}/images/my-account-dashboard.png)

If you have an `Access Key` here, good, if not, click `Generate New`.

You should get a `Public Key` and a `Private Key`.

```Shell
"Public Key" === username
"Private Key" === password
```

Take those values and plug them in to your `auth.json` file.

Now, re-run

```Shell
composer install
```

From your `root` directory, and it should work!