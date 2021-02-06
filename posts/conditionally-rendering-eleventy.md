---
title: "Conditionally Rendering JavaScript Templates in Eleventy"
description: "Show this if that, but dont show this unless both of those."
date: 2021-02-06
tags:
  - webdev
---

Sometimes, we want display content on a website only if certain conditions are met. This is known as *conditional rendering.*

A very common usecase of this is content navigation links at the bottom of a blog post. We only want to link to the *Next Post* if it exists, likewise for the *Previous Post*. 

<small>[Skip to example.](#real-world-example%3A-collection-navigation)</small>

## If / Then / Else

In  JavaScript, we can evaluate an if / then / else condition using the *ternary operator*.

``` js 
  1 + 1 == 2 ? "Math works!" : "Math is broken!";
  // output: "Math works!"
```
Here is the same logic represented with a traditional if statement:
``` js 
  if (1 + 1 == 2) {
    return "Math words!";
  } else {
    return "Math is broken!";
  }
  // output: "Math works!"
```

However, since the ternary operator is an expression, we can also use it inside of our Eleventy templates. 

``` js
  render({ bool: true }) {
    return `
      <h1>Hello World</h1>
      ${bool ? 
        `<p>Yay! bool is true!</p>`
        :
        `<p>Oh no! bool is false!</p>`
      }
    `;
  }
```
``` html
  <h1>Hello World</h1>
  <p>Yay! bool is true!</p>
```

## What About Just If / Then?

Sometimes, we don't want to show anything if a condition is met.

One way to accomplish this is using the ternary operator again, and returning an empty string if the provided condition is false.

``` js
  render({ bool: false }) {
    return `
      <h1>Hello World</h1>
      ${bool ? 
        `<p>Yay! bool is true!</p>`
        :
        ``
      }
    `;
  }
```
``` html
  <h1>Hello World</h1>
```
### Common Pitfalls: Binary Logical Operators

Typically, we only need the ternary operatory if we are managing three pieces of information. If we only need to manage two pieces of information, we can use the logical AND operator: &&

While this works when our conditional is true...

``` js
  render({ bool: true }) {
    return `
      <h1>Hello world!</h1>
      ${bool && 
        `<p>bool is true!</p>`
      }
    `;
  }
```
``` html
  <h1>Hello World</h1>
  <p>bool is true!</p>
```

...it **does not** work when our conditional is false:

``` js
  render({ bool: false }) {
    return `
      <h1>Hello world!</h1>
      ${bool && 
        `<p>bool is true!</p>`
      }
    `;
  }
```
``` html
  <h1>Hello World</h1>
  false
```

We have an extra `false` in our output! This is because the template is converting the output of the expression to a string. 

In the previous example, the output was the HTML string that we wanted to display, so all was well. In this example, our expression evaluates to `false`, and `String(false)` returns `"false"`. Similarly, conditions that evaluate to `null` will return the string `"null"`, and `undefinded` will return `"undefined"`.

With this in mind, the simplest way to show to show binary content is to stick with the ternary operator and return an empty string for the unwanted case.

### But what if I reaaaally want to use Binary Logical Operators?

Okay, understandable. They ARE more readable.

One simple fix to the above issue is to use a Transform in your Eleventy config file. A transform--as the name implies--transforms the output content of our templates during the build process.

This `remove-falsy` transform will look for any occurances of `undefined`, `false`, or `null`, in our rendered templates and remove them if they are not escaped by a preceding `$`.

``` js 
  module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("remove-falsy", function(content) {
      const filteredContent = content
        .replace(/(?<!\$)(?:undefined)/g, '')
        .replace(/(?<!\$)(?:false)/g, '')
        .replace(/(?<!\$)(?:null)/g, '')
        .replace(/(?:\$undefined)/g, 'undefined')
        .replace(/(?:\$false)/g, 'false')
        .replace(/(?:\$null)/g, 'null')
      // I didn't want to break my brain by trying to combine these into a single regular expression.
      
      if (filteredContent.length !== content.length) {
        console.log(`Removed falsy value from: ${this.inputPath}`);
      }

      return filteredContent;
    });
  }
```
Now we can use with logical binary operators without worrying about stringified falsy values. 
``` js
  render({ bool: false }) {
    return `
      <h1>Hello world!</h1>
      ${bool && 
        `<p>bool is true!</p>`
      }
    `;
  }
```
``` html
  <h1>Hello World</h1>
  <!-- Success! -->
```

However, I find that I often forget to escape null, false, and undefined when writing blog posts. Rather than dealing with words dissapearing from my website, I am okay with using the slightly more verbose ternary operator. 

## Real World Example: Collection Navigation

Consider a 11ty.js template, Post. 

``` js
  class Post {
    data() {
      return {
        layout: 'layouts/base',
        tags: ['posts'],
      }
    }

    postNav(data) {
      const nextPost = this.getNextCollectionItem(data.collections.posts, this.page);
      const previousPost = this.getPreviousCollectionItem(data.collections.posts, this.page);
      
      return (nextPost || previousPost) ?
        `<nav>
          <ul>
          ${ nextPost ?
            `<li>
              <b>Next:</b> <a href="${nextPost.url}">${nextPost.data.title}</a>
            </li>` : ''
          }
          ${ previousPost ? 
            `<li>
              <b>Previous:</b> <a href="${previousPost.url}">${previousPost.data.title}</a>
            </li>` : ''
          }
          </ul>
        </nav>`
      :
        '<p>There are no other posts in this collection... for now!</p>'
    }

    render(data) {
      return `<h1>${data.title}</h1>
        ${data.content}
        <br>
        ${this.postNav(data)}
      `;
    }
  }

  module.exports = Post;
```

Wanna see how it looks? Well, look around!