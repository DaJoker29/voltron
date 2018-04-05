# Purpose
> Create a tiny CMS framework that is so simple and easy a 5 year old can use it.

# Targets
## Interface should:
- INTUITIVE - Easy to Follow, Easy to Finish, Easy to Exit
- STREAMLINED - Clear path to the finish line. No task should take more than 3 steps.

## Modules should:
- LOOSELY COUPLED - Never access other modules. Only communicate through Core.
- DISCRETE - Can be worked on and tested in isolation.
- NON-INTERFERING - Multiple active modules should never clash

## Core should:
- COMPLEMENTARY - Core should sense when multiple active modules can complement each other and offer options for extended functionality.

# Core
The Core handles initialization and the basic user system.

## User System
 Users authenticate with a username and Google Authenticator One-Time Password (OTP) based on a key that is generated at the time of registration. 

 User models will house three primary fields of data: username (used to authenticate), email address (used for system messages) and display name (name shown on published content). Aside from that, all other data associations are stored and handled by their respective modules. (Blog posts, for example, will store a reference to their author's _id)

## Web Interface
Should I do a Single-Page Interface (AJAX/React/Angular) or continue using Express/Pug templating.

## Module API
Modules will contain their own respective routes, views, controllers and will process and return data from their own models. 

Modules will also pass extended data with requirements to allow extra functionality in the core. For example, the podcast module might post an new episode with an added `blog_post` object with content that should be posted to the blog when it goes live.

Core should have an internal pub/sub system which will trigger certain functions when other functions are executed. For example, if Podcast and Blog are both active, a new blog post could be created when a podcast episode gets published. Not entirely sure yet.

# Modules
## Blog
Simple blogging module using a Markdown editor with a live preview option. 

Required fields are title and content. Additional fields: tags (for categorization and filtering) and SEO specific fields (meta title, meta description). Add'l fields can be turned on/off from the interface.

You can set posts to be published on a specific time and date.

## Media Library
Allows you to upload various types of media for easy online access. Configurable options: Max File Size, Allowed File Types.

Will also allow users to obsfucate uri's to hide location of data. This will plug in to the eCommerce module to allow control over digital downloads. 

## Podcast
Users can easily upload and hosting podcasts from this module. They simply fill out the forms and upload the mp3 and the feed is automatically generated.

## eCommerce

For selling things. Haven't figured it out yet.