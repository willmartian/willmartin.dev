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