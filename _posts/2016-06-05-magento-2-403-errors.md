---
layout: post
title: "How to Fix 403 Errors on a Fresh Magento 2 Install"
date:   2015-05-06 6:01:23
categories: magento2 errors apache
comments: true
---
I installed a local version of [Magento 2](https://github.com/magento/magento2), but I was having issues validating the install, I was getting a 403 error on page load.

```console
Forbidden

You don't have permission to access / on this server.
Server unable to read htaccess file, denying access to be safe
```


I don't claim to be a DB administrator, so I searched on the webs for a solution and got nowhere fast. So I turned to my super smart coworker [Brent Jameson](http://www.jamesonnetworks.com/), who is a wizard. Apparently, I had to do a few things to my Apache configurations to get it to hit my `index.php`.

## 1. Specify `Allow from all` in my Virtual Hosts file
Turns out I had to add the `Allow` directive in my virtual hosts file.

Edit your vhosts configuration in(in OSX):

```console
vim /etc/apache2/extra/httpd-vhosts.conf
```

Add this line in your `<Directory>` node:

```console
Allow from all
```

So it becomes this:

```console

<VirtualHost *:80
    ServerName rds.dev
    ServerAlias rds.dev
    DocumentRoot "/Volumes/Sites/my_site.dev"
    <Directory "/Volumes/Sites/my_site.dev">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```

### 2. Force Apache to use my user when hitting our site.
Figure out your username. This is what we will tell Apache to load sites under. You can find your username by running:

```console
whoami
```

Open your `httpd.conf` file.

```console
vim /etc/apache2/httpd.conf
```

Find the line specifying `User` (right above the line specifying `Group`), and change it to use your user:

```console
# If you wish httpd to run as a different user or group, you must run
# httpd as root initially and it will switch.
#
# User/Group: The name (or #number) of the user/group to run httpd as.
# It is usually good practice to create a dedicated user and group for
# running httpd, as with most system services.
#
User Josh
Group _www
```

### 2.b Change ownership of your magento 2 Directory
This is probably a `bad idea` and you should never do this on a live server (which is true of pretty much everything in this post), but we're going to change ownership of the entire magento 2 directory system and assign it to you.

`cd` into the parent directory containing all your websites (mine is `/Volumes/Sites/`).


Then `chown` the magento 2 site to change it's ownership


```Shell
cd /path/to/sites
sudo chown -R Josh:_www my_site.dev
```

After doing all that, I was able to hit the index.php inside my Magento 2 instance.

Thanks again for the help [Brent Jameson](http://www.jamesonnetworks.com/)!