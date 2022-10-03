---
title: Overview
---

# {% $markdoc.frontmatter.title %}

## Example Next.js tags

### Comment

{% comment %}
   This is a Next.js comment, this will not be rendered by markdoc.
{% /comment %}

### Script

{% script src="example.js" strategy="lazyOnload" /%}

### Link

{% link href="https://markdoc.dev/" %}
Markdoc.dev
{% /link %}

{% link href="/" %}
markdoc-starter index page
{% /link %}

### Head

{% head %}
    <meta property="og:title" content="Overview" key="title" />
{% /head %}
