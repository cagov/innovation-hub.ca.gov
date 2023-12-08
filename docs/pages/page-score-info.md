---
title: Performance, accessibility, and readability
description: How the California Office of Data & Innovation measures the pages of the Innovation Hub
---

The Office of Data & Innovation focuses on creating services that:

* Perform well on all devices
* Are accessible by all Californians
* Are easy to read

We grade every page on our website by these standards. Our widget scores a page every time we change it.

We measure these 3 areas because they’re important parts of the user experience. They’re also important to equitably delivering services to Californians.

## Performance

Low performance results in a poor experience for visitors. Slower websites have:

* [Higher bounce rates](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/)
* [Lower conversion rates](https://www.cloudflare.com/en-gb/learning/performance/more/website-performance-conversion-rates/)
* [Physical stress for visitors](https://www.neuronsinc.com/cases/ericsson)

MDN Web Docs talks about [why performance matters](https://developer.mozilla.org/en-US/docs/Learn/Performance/why_web_performance).

### Performance is an equity issue

Websites that load fast on all devices serve all Californians.

Cheaper mobile devices have slower processors. These devices take more time to load webpages with a lot of JavaScript. A page with a lot of JavaScript is 1,000% slower on a cheap phone versus a new laptop on the same internet connection. This is an example of [performance inequality](https://infrequently.org/series/performance-inequality/).

Faster websites help everyone. Even modern devices sometimes connect to slow networks.
Page speed is a search ranking factor

Search engines like Google use page loading time to rank search results. Google has used mobile page speed as a ranking factor since 2018.

### How we calculate our scores

We use [Lighthouse](https://developer.chrome.com/en/docs/lighthouse/performance/performance-scoring/) to give us a performance score for each page. It’s an open source web performance tool from Google. We installed it through the [performance-leaderboard-pagespeed-insights npm package](https://www.npmjs.com/package/performance-leaderboard-pagespeed-insights). We run it on Amazon Web Services Lambda against our production systems. Lighthouse’s criteria evolves with the web. Each release details the changes.

### How to improve your website

Start by measuring your website’s performance. There are a few options:

* [PageSpeed Insights](https://pagespeed.web.dev/)
* Lighthouse in Chrome’s developer tools
* Running your own [performance-leaderboard](https://www.npmjs.com/package/performance-leaderboard) scripts
* A software-as-a-service tool like [Calibre](https://calibreapp.com/), [Siteimprove](https://www.siteimprove.com/), or [SpeedCurve](https://www.speedcurve.com/)

Delivering too much JavaScript is a common cause of performance problems. Forcing every user to download, understand, and run a ton of code before fully showing the page can cause long delays.

Performance analysis tools like [WebPageTest](https://www.webpagetest.org/) and Lighthouse can recommend changes to improve performance. They’ll highlight the changes that will have the most impact on site speed. Following their guidelines will get you into the top tier of state website speed rankings.

Free courses like [Lightning-Fast Web Performance](https://www.webpagetest.org/learn/lightning-fast-web-performance/) offer deep dives into performance optimization.
