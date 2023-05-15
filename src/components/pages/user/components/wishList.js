import React, { useEffect, useState } from "react";
import axios from "axios";

function GetWishlistItems(){
    const[wishList ,setWish]= useState([]);


    useEffect(() => {
        const listWishes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/wishlist', {
                    withCredentials: true,
                });
                if (response && response.data) {
                    setWish(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        };
    }, []);

    const deleteFromWishlist = async (id) => {
        try {
         await axios.delete(`http://localhost:8000/wishlist/${id} `,{        
                  withCredentials: true,
        });
          console.log('product deleted from wishlist:');
        } catch (error) {
          console.error('Error deleting product from wishlist:', error);
        }
      }
    return(
        <div className="wishList">

        </div>
    );
}
export default GetWishlistItems;