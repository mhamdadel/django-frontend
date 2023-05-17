/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import axios from "axios";
import withLoader from "../user/components/loader";
import { MagnifyingGlass } from 'react-loader-spinner';
function GetWishlistItems() {
  const [wishList, setWish] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
    // const listWishes = async () => {
    //   try {
        
    //     const response = await axios.get("http://localhost:8000/wishlist/", {
    //       withCredentials: true,

    //     });
    //     if (response && response.data) {
    //        setWish(response.data);
    // setIsLoading(false);
    //     }
    //   } catch (error) {
    //     console.log(error.response.data);
    //   }
    // };

    useEffect(() => {
      setIsLoading(true);
      axios.get("http://localhost:8000/wishlist/",{
        withCredentials: true
      })
      .then((res)=> {
        setWish(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
    }, []);

  //   listWishes();

  // }, []);

  const deleteFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/wishlist/${id} `, {
        withCredentials: true,
      });
      console.log("product deleted from wishlist:");
      setWish(wishList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [isLoading]);
  return (
    <div className="wishList">
           {isLoading ? (
 <withLoader>
 <MagnifyingGlass
 visible={true}
 height="80"
 width="80"
 ariaLabel="MagnifyingGlass-loading"
 wrapperStyle={{}}
 wrapperClass="MagnifyingGlass-wrapper"
 glassColor="#c0efff"
 color="#e15b64"
/>
</withLoader>
      ) : (
        <div className="py-3 py-md-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wish-list">
                  <div className="cart-header d-none d-sm-none d-mb-block d-lg-block">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Products</h4>
                      </div>
                      <div className="col-md-2">
                        <h4>Price</h4>
                      </div>
                      <div className="col-md-2">
                        <h4>Remove</h4>
                      </div>
                    </div>
                  </div>
{wishList.length > 0 ? (
wishList.map((element) => {
  return(
<div className="cart-item" key={element.id}>
 
 <div className="row">

   <div className="col-md-6 my-auto" >
     <a href="">
       <label className="product-name">
         <img
           src={`https://res.cloudinary.com/deg0m2eu4/${element.product_details.Image}`}
           style={{ width: "50px", height: "50px" }}
           alt=""
         />
         {element.product_details.title}
       </label>
     </a>
   </div>
   <div className="col-md-2 my-auto">
     <label className="price">{element.product_details.price} </label>
   </div>
   <div className="col-md-2 col-5 my-auto">
     <div className="remove">
     <button  onClick={()=> deleteFromWishlist(element.id)} className="btn btn-danger btn-sm">
  <i className="fa fa-trash"></i> Remove
</button>
     </div>
   </div>

     
 </div>

</div>
  )
}
)      
):(
    <div>No items in wishlist</div>
    )}
    
              </div>

            </div>
  
          </div>
    
        </div>
      </div>
      )}
    </div>
  );
}
export default GetWishlistItems;
