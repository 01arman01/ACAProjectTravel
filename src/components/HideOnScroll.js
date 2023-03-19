// import React, { useState, useEffect } from 'react';
// import Post from './Post';

// function PostList() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     setLoading(true);

//     // Загрузите новую страницу постов с вашего сервера
//     fetch(`/api/posts?page=${page}`)
//       .then(response => response.json())
//       .then(newPosts => {
//         setLoading(false);
//         setPosts([...posts, ...newPosts]);
//         setPage(page + 1);
//       });
//   }, [page]);

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       // Достигнут конец страницы, загрузите следующую страницу
//       setPage(page + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div>
//       {posts.map(post => (
//         <Post key={post.id} post={post} />
//       ))}
//       {loading && <div>Loading...</div>}
//     </div>
//   );
// }

// export default PostList;