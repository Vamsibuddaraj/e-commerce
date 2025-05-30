import { useEffect, useState } from 'react'
import { useFilter } from '../context/filterContext'


interface Product {
    category:string
}

interface FetchData {
    products:Product[]
}

const SideBar = () => {
    const {     searchQuery,
                setSearchQuery,
                selectedCategory,
                setSelectedCategory,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                keyword,
                setKeyword
            } =useFilter()

    const [category,setCategory] = useState<string[]>([])
    const [keywords] = useState<string[]>(["apple","watch","fashion","trend","shoes","shirts"])
    const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(value === ""){
            setMinPrice(undefined)
        }else{
            setMinPrice(parseInt(value))
        }
    }
    const handleMaxPriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value     
        if(value === ""){
            setMaxPrice(undefined)
        }else{
            setMaxPrice(parseInt(value))
        }
    }    
    const handleRadioChangeCategories = (category:string) => {
        setSelectedCategory(category)
    }   
    const handleKeywordClick = (keyword:string) => {
        setKeyword(keyword)
    }  
    const handleReset = () => {
        console.log("Resetting filters")
        setSearchQuery("")  
        setSelectedCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined) 
        setKeyword("")
    }

    useEffect(()=>{
        const fetchCategory = async () => {
            try{
                const response = await fetch("https://dummyjson.com/products")
                const data:FetchData = await response.json()
                const uniqueCategory = Array.from(new Set(data.products.map(product=>product.category)))
                setCategory(uniqueCategory)
            }catch(Err){
                console.log("Error while fetching products",Err)
            }
        }
        fetchCategory()
    },[])
  return (
    <div className='w-64 p-5 h-screen'>
        <h1 className="text-2xl font-bold mb-10 mt-4">Store</h1>
        <section>
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} type='text' className='border-2 rounded px-2 mb-4  w-full' placeholder='Search Product'/>
            <div className="flex justify-center items-center">
                <input value={minPrice??""} onChange={handleMinPriceChange}  type='text' className='border-2 mr-2 px-5 py-1 mb-3 w-full' placeholder='Min'/>
                <input value={maxPrice??""} onChange={handleMaxPriceChange} type='text' className='border-2 mr-2 px-5 py-1 mb-3 w-full' placeholder='Min'/>
            </div>
            <section>
                <div className='mb-5'>
                    <h2 className='text-xl font-semibold mb-3'>Categories</h2 >
                </div>
                {category.map((category,index)=>(   
                        <label key={index} className='block mb-2'>
                            <input type='radio' name='category' checked={selectedCategory===category} value={category} onChange={()=>handleRadioChangeCategories(category)} className='mr-2 w-[16px] h-[16px]'/>
                            {category.toUpperCase()}
                        </label>
                ))}
            </section>
            <div className="mb-5 mt-4">
                <h2 className='text-xl font-semibold mb-3'>Keywords</h2 >
                <div>
                    {keywords.map((keyword,index)=>(   
                        <button key={index} onClick={()=>handleKeywordClick(keyword)} className='block mb-2 px-4 py-2 w-full text-left bg-gray-200 rounded hover:bg-gray-200'>
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleReset} className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5'>Reset Filter</button>
        </section>
    </div>
  )
}

export default SideBar