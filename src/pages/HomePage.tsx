import React, { useCallback, useEffect, useState } from 'react'
import Search from '../components/Search'
import Card from '../components/Card'
import { ProductCard } from '../modal/Modal'
import Axios from '../context/Axios'
import Filter from '../components/Filter'

interface Props {}

const HomePage = (props: Props) => {
  const [items, setItems] = useState<ProductCard[]>([]);
  const [search,setSearch] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(20);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  // function to get Data when scroll
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await Axios.get(`${Axios.defaults.baseURL}/products/search?q=${search}&limit=20&skip=${index}&select=title,price,thumbnail,rating`);
      const newProducts: ProductCard[] = response.data.products;

      // prevent duplicate data when get data using useEffect
      const existingProductIds = new Set(items.map(product => product.id));
      const filteredProducts = newProducts.filter((product: ProductCard) => !existingProductIds.has(product.id));
      if (filteredProducts.length > 0) {
        setItems(prevItems => [...prevItems, ...filteredProducts]);
      }

      setIndex((prevIndex) => prevIndex + 20);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    console.log(items)
  }, [index, isLoading]);

  // Load 20 first products
  useEffect(() => {
    const getData = async () => {
      setIndex(20);
      setIsLoading(true);
      try {
        const response = await Axios.get(`${Axios.defaults.baseURL}/products/search?q=${search}&limit=20&skip=0&select=title,price,thumbnail,rating`);
        setItems(response.data.products);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, [search]);

  // Catch scroll-to-bottom event and get 20 next products with timeout 0.2s
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
          fetchData();
        }
      }, 200);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [fetchData, isLoading, scrollTimeout]);

  // Get Category List
  useEffect(()=>{
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get(`${Axios.defaults.baseURL}/products/category-list`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  },[]);

  return (
    <div className='h-screen'>
        <div className='my-20 content-center'>
          <div className='flex items-center justify-center md:justify-end mb-5 mx-12'>
            <Search value={search} setValue={setSearch}/>
          </div>

          <Filter 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}/>
          <div className='ml-0 md:ml-32 lg:ml-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
            {
              items?.map((product:ProductCard)=>{
                return(
                  <Card product={product} key={product.id}/>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default HomePage