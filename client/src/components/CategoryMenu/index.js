import React,{useEffect} from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";



function CategoryMenu({ setCategory }) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  
  const { data: categoryData ,loading} = useQuery(QUERY_CATEGORIES);

useEffect(() => {
  if(categoryData){
    dispatch({
      type:UPDATE_CATEGORIES,
      categories:categoryData.categories
    })
    categoryData.categories.forEach((category) => {
      idbPromise('categories', 'put', category);
    });
    // add else if to check if `loading` is undefined in `useQuery()` Hook
  } else if (!loading) {
    // since we're offline, get all of the data from the `products` store
    idbPromise('categories', 'get').then((categories) => {
      // use retrieved data to set global state for offline browsing
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categories
      });
    });
  }
}, [categoryData,loading,dispatch])
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            dispatch({
              type:UPDATE_CURRENT_CATEGORY,
              currentCategory:item._id
            })
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
