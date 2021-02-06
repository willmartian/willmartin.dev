---
title: "Ads are Bad UX (Draft)"
description: What are our alternatives to online advertising?
date: 2021-02-02
tags:
  - ux
draft: true
---

*<small>This is a live draft document and may be updated frequently until this disclaimer is removed!</small>*

Ads *suck*. No one likes watching ads, and ads on the internet are even worse. However, we tolerate them because we accept that they are necessary. I mean, surely content creators deserve to be compensated for their work. And website owners reserve the right to fill their sites with ads.

That's just the way it is, right?

## Problem: Bad UX

User-centered design (or its trendier rename, human-centered design, in case you need to specifically exclude [dogs](https://en.wikipedia.org/wiki/Animal-computer_interaction)) embraces the idea that understanding users and their needs is critical to the design process. Peter Morville, a pioneer in the field of user experience, breaks user expectations down into seven factors:

TODO: How can ads diminish the following qualities?

### Useful

Does your website accomplish the goal of the user?

### Usable

There should be minimal roadblocks for users to accomplish the task they had in mind when visiting your website, whether this is finding information, enjoying a video, or purchasing an item. 

### Findable

Information on the website should be easy to navigate. 

### Credible

Users should be able to trust the content on your website.

### Accessible

Each of these other factors should be equally true for users of all backgrounds and abilities.

### Desirable

The visuals and aesthetics of the website should evoke positive feelings from the user. 

## Possible Solution: Micropayments

What if we just *asked* our users for compensation?

Maybe it is crazy, but maybe it isn't. The open source community survives on this model, where frequent users of libraries are encouraged to contribute work or donate. We see this mentality growing outside of technology and into content as well, with platforms like Ko-fi, Buy Me a Coffee, Patreon, and so on becoming popular recepticles for online contributions.

Instead of extracting value from every single user (or, the percentage not using ad block), we should rather look to deliver experiences to our users that have inherent value--which tend to prompt payback.

In a way, these small contributions--or, *micropayments*--are like busking.

#### WCG Proposal

#### Autotip and the Microtip Meta Tag

``` html/
<meta name="microtip" content="btc_address" data-currency='btc' data-recipient="Autotip Giveaway Program">
```

#### Funding Meta Tag
``` html/
<meta name="funding" data-type="btc" content="btc_address" title="Bitcoin address for WillMartin.dev"/>

<meta name="funding" data-type="href" content="link_to_paypal_account" title="Paypal account for WillMartin.dev"/>
```

## References

- http://semanticstudios.com/user_experience_design/
- https://github.com/microtip/spec/blob/master/meta.md
