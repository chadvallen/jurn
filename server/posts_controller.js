module.exports = {
    createPost: (req, res) => {
        const db = req.app.get('db');
        const { user_id, title, entry, private } = req.body;
        db.create_post(user_id, title, entry, private).then(post => {
            res.status(200).json(post)
        }).catch(error => {
            console.error('Error on createPost', error)
        })
    },
    getPostsPrivate: (req, res) => {
        const db = req.app.get('db');
        const { username } = req.params;
        db.get_posts_private(username).then(posts => {
            res.status(200).json(posts)
        }).catch(error => {
            console.error('Error on getPostsPrivate', error)
        })
    }
}