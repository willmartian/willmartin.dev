module.exports = {
    eleventyComputed: {
        permalink: data => {
            if (process.env.ELEVENTY_ENV !== "production")
                return data.permalink;
            else return data.draft ? false : data.permalink;
        }
    },
    layout: 'layouts/post.11ty.js'
};