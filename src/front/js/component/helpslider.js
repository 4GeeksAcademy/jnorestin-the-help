

  //  import React, { useEffect, useState, useContext } from 'react';
//  import { Context } from '../store/appContext';

// export const HelpSlider = (props) => {
//    const { store, actions } = useContext(Context);
//   const [posts, setPosts] = useState([]);
// //    const datadummy = [
// //    {
// //    'description':" i want to see this work",
// //   "img":" https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp"

// //   },
// //    {
// //     'description':" i want to see this work",
// //     "img":" https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp"

// //    },
// //    {
// //     'description':" i want to see this work",
// //     "img":" https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp"

// //     },
// //    ]




//   useEffect(() => {
//     actions.fetchPosts( 
      
//     );
//   }, []);

//   return (
//     <div className="card-container">
//       {posts.userPosts.map((item) => {
//         return (
//           <div className="card">
//             <div className="card-body">
//               <div className="user-info">
//                 <img src="User Profile Image" className="profile_image" />
//                 <h5 className="card-title"></h5>
//               </div>
//               <p className="card-text">{item.description}</p>
//               <div className="card-images">
//                 {item.images.map((image, index) => {
//                   return (
//                     <img src={image} key={index} className="cardImage" />
//                   )
//                 })}
//               </div>
//               <div className="post-info">
//                 <p className="date">{item.date}</p>
//                 <p className="location">{item.location}</p>
//               </div>
//             </div>
//             <div className="d-flex">
//               <div>
//                 {item.candidates.map((cand, index) => {
//                   return (
//                     <div className="helper-info d-flex navbar">
//                       <img src="helper profile image" className="helper_image mx-5" />
//                       <h5 className="card-text2 mx-5">{cand.name}</h5>
//                       <i class="fa-sharp fa-regular fa-envelope ms-5 me-2"></i>
//                       <div class="form-check form-switch">
//                         <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
//                         <label class="form-check-label" for="flexSwitchCheckDefault"></label>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//             <div className=" d-flex w-100">
//               <div className="">
//                 <button className="btn btn-primary" type="submit" value="Submit Selection"></button>
//               </div>
//               <div className="ms-auto">
//                 <button onClick={(e)=> handleDelete(e)} className="btn btn-danger" type="submit" value="Delete Post" > Delete</button>
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   );


















// // //   return (
// // //     <div className="helpslider-container">
// // //       {store.posts.map((post, index) => {
// // //         return(
// // //         <div className="helpslider-card" key={index}>
// // //           {post.images.map((image)=>{
// // //             return <div className='card'style={{width:"18rem"}}> <img src={image.url} alt="Profile" className="w-100" /></div>
// // //           })}

// // //           <div className="card">
// // //             <div className="card-body">
// // //               <p className="card-text">{post.description}</p>
// // //             </div>
// // //           </div>
// // //         </div>)
// // // })}
// // //     </div>
// // //   );
// // // };

// //export default HelpSlider;
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import './helpslider.css';

const HelpSlider = (props) => {
  const { store, actions } = useContext(Context);
  const datadummy = [
    {
      'description':" After posting about my car's transmission problem on HelperSite, I had a skilled mechanic at my door within 2 hours. The service was not only speedy and professional but also remarkably affordable. HelperSite's efficient service in connecting me to reliable help exceeded all expectations, making it a must-recommend for anyone facing car issues.!",
      "img":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
    },
    {
      'description':" Faced with an unexpected childcare predicament, I decided to post my need for a nanny on HelperSite. To my delight and relief, a qualified and caring nanny was in my home, ready to help. The quick response, impressed me greatly. The Help Site delivered a fantastic service by efficiently linking me with a reliable nanny.  I can't recommend the Help Site enough! ",
      "img":"https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?cs=srgb&dl=pexels-masha-raymers-2726111.jpg&fm=jpg"
    },
    {
      'description':" After realizing I was frequently struggling to find time to walk my energetic Labrador, I decided to post my predicament on HelperSite. Soon enough, I was contacted by a professional dog walker who turned out to be a lifesaver. Not only was she punctual and reliable, but she also had an undeniable rapport with my dog. The cost of the service was surprisingly affordable, making the whole experience with HelperSite a breath of fresh air. To all dog owners juggling a busy schedule Tap in.",
      "img":"https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp"
    },
    {
      'description':"My once overgrown garden was becoming a real eyesore, but my old lawnmower had broken down. I decided to give HelperSite a try and posted about my garden issue. Much to my surprise, a knowledgeable gardener with professional equipment was ready to tackle the task promptly. He did an impeccable job and at a very reasonable price. The seamless experience with HelperSite was truly impressive, solving my gardening woes in a snap. For anyone battling with yard maintenance, HelperSite is a fantastic solution.",
      "img": "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.webp?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU="
    }
  ]

  useEffect(() => {
    actions.fetchPosts();
  }, []);

  return (
    
    <div className="card-container">
      {datadummy.map((item, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="user-info">
                <img src={item.img} alt="User Profile" className="profile_image" />
                <h5 className="card-title"></h5>
              </div>
              <p className="card-text">{item.description}</p>
              <div className="rating">★★★★★</div>
            </div>
          </div>
        )
      })}
     
    </div>
  );
};

export default HelpSlider;

// import React, { useEffect, useState, useContext } from 'react';
// import { Context } from '../store/appContext';

// export const HelpSlider = (props) => {
//   const { store, actions } = useContext(Context);

//   // Initialize posts as an object containing an empty array userPosts
//   const [posts, setPosts] = useState({userPosts: []});

//   useEffect(() => {
//     actions.fetchPosts().then(fetchedPosts => setPosts({userPosts: fetchedPosts}));
//   }, []);

//   return (
//     <div className="card-container">
//       {posts.userPosts.map((item) => {
//         return (
//           <div className="card" key={item.id}>
//             <div className="card-body">
//               <p className="card-text">{item.description}</p>
//               <div className="card-images">
//                 {item.images.map((image, index) => {
//                   return (
//                     <img src={image} key={index} className="cardImage" />
//                   )
//                 })}
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   );
// }

// export default help

