---
layout: post
title: How to Use Grunt in Magento 2
description: How and where to use grunt and grunt commands in a base Magento 2 install
categories: articles
date: 2016-06-08
tags: [magento 2, grunt, cli]
keywords: [magento 2, grunt, cli]
image:
---

Grunt comes bundled by default in all Magento 2 repositories.

If you aren't familiar with what Grunt is or what it does, I suggest starting with Smashing Magazine's article on [getting started with grunt](https://www.smashingmagazine.com/2013/10/get-up-running-grunt/), Scotch.IO's [equivalent article](https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt), or even Grunt's [official getting started guide](http://gruntjs.com/getting-started).

Now, we'll cover how to set up and run Grunt in a base Magento 2 installation.

## 1. Install Grunt command line utility globally
Open terminal and navigate to your Magento 2 directory, in the root.

```Shell
cd /path/to/magento/project
```
You should be in the root of the project. Make sure by running

```Shell
ls
```
which will show something like this

```Shell
# ...
# ...
# package.json
# ...
# ...
```
You should see a package.json file.

## 2. Install the Node Modules for your Magento 2 project
Now we've got to install the node module dependencies that the site needs.

If you `cat` the `package.json` file, you should see a JSON object of all of the node modules needed to run `grunt` tasks on the site.

```Shell
cat package.json
```

And you'll see the json object that looks something like this

```Shell
# ...
# ...
# "devDependencies": {
#         "glob": "^5.0.14",
#         "grunt": "^0.4.5",
# ...
# ...
```

We've got to install all that.

Simply run

```Shell
npm install
```
Which will search through that `package.json` folder and install the modules listed in it.


## 3. Install the LiveReload browser extension
This part is optional, but you want to do it. [LiveReload](http://livereload.com/) is a browser extension that will automatically pull in CSS changes in to the browser window without you having to refresh.

Go [install it](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) now.

## 3. Run Grunt commands
Now that you've got it all installed, you can now run grunt commands.

Grunt commands are run from the root directory in Magento 2.

Run `grunt less` to verify it is set up properly.

Here are a list of grunt commands you can run on a base M2 install

```Shell
grunt clean:<theme>. This command removes static files related to your theme in both pub/static and var directories.
grunt exec:<theme>. This one republishes source files symlinks to pub/static/frontend/<Vendor>/<theme>/<locale>.
grunt less:<theme> should be used to compile .css files using symlinks from the aforementioned directory.
grunt watch. This command is designed for the LiveReload extension. It tracks changes in the source files, recompiles .css files, and reloads browser pages.
```
([source](https://firebearstudio.com/blog/magento-2-grunt.html))


Most of the time you should be running

```Shell
grunt watch
```

Which will observe all of the `.less` files.

When you change and save the files, this task will automatically recompile your `.less` into `.css` and reload your webpage through the `LiveReload` extension you installed in Step 3.

## If you get **Required config property missing** errors

or

## If running grunt watch starts grunt, but it doesn't appear to be "watch"ing the files in your new theme

If you get errors that look like this

```Shell
Warning: Required config property "exec.my_theme" missing. Use --force to continue.

Aborted due to warnings.
```

This is likely because you don't have the configuration for Grunt set up properly.

In my case, I had installed grunt &amp; the node modules correctly, **but I failed to add my new theme to the themes.js gruntfile**.

Remember to add your theme to the file

```Shell
dev/tools/grunt/configs/themes.js
```

It will look like this

```Shell
/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

'use strict';

/**
 * Define Themes
 *
 * area: area, one of (frontend|adminhtml|doc),
 * name: theme name in format Vendor/theme-name,
 * locale: locale,
 * files: [
 * 'css/styles-m',
 * 'css/styles-l'
 * ],
 * dsl: dynamic stylesheet language (less|sass)
 *
 */
module.exports = {
    blank: {
        area: 'frontend',
        name: 'Magento/blank',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-l',
            'css/email',
            'css/email-inline'
        ],
        dsl: 'less'
    },
    luma: {
        area: 'frontend',
        name: 'Magento/luma',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-l'
        ],
        dsl: 'less'
    },
    backend: {
        area: 'adminhtml',
        name: 'Magento/backend',
        locale: 'en_US',
        files: [
            'css/styles-old',
            'css/styles'
        ],
        dsl: 'less'
    }
};

```

In my case, I wanted to add a new theme called `my_theme`, so I added this to that file

```Shell
my_theme: {
    area: 'frontend',
    name: 'my_company/my_theme',
    locale: 'en_US',
    files: [
        'css/styles-m',
        'css/styles-t',
        'css/styles-l'
    ],
    dsl: 'less'
},
```

Here's what it looks like all together

```Shell
/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

'use strict';

/**
 * Define Themes
 *
 * area: area, one of (frontend|adminhtml|doc),
 * name: theme name in format Vendor/theme-name,
 * locale: locale,
 * files: [
 * 'css/styles-m',
 * 'css/styles-l'
 * ],
 * dsl: dynamic stylesheet language (less|sass)
 *
 */
module.exports = {
    blank: {
        area: 'frontend',
        name: 'Magento/blank',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-l',
            'css/email',
            'css/email-inline'
        ],
        dsl: 'less'
    },
    luma: {
        area: 'frontend',
        name: 'Magento/luma',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-l'
        ],
        dsl: 'less'
    },
    my_theme: {
        area: 'frontend',
        name: 'my_company/my_theme',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-t',
            'css/styles-l'
        ],
        dsl: 'less'
    },
    backend: {
        area: 'adminhtml',
        name: 'Magento/backend',
        locale: 'en_US',
        files: [
            'css/styles-old',
            'css/styles'
        ],
        dsl: 'less'
    }
};

```

After adding this theme to my grunt themes.js file, it started observing my file changes properly.
