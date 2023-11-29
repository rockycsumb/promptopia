'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])




  const handleSearchChange = async (e) => {
    console.log("from handle ", e.target.value)
    e.preventDefault()
    setSearchText(e.target.value)

    const fetchPostsByWord = async (searchWord) => {
      const response = await fetch(`/api/prompt/searchPrompts/${searchWord}`)
      const data = await response.json();
      // console.log("fetch ", data)
      return data;
    }

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();

      setPosts(data)
    }

    if(e.target.value){
      const data = await fetchPostsByWord(e.target.value)
      if(data){
        setPosts(data);
        console.log("data ", data)
      }
    } else {
      await fetchPosts()
    }
  }


  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();
      console.log("first ", data)
      setPosts(data)
    }

    fetchPosts();

  },[])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={(e)=> handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={posts}
        onClick={(e)=>handleSearchChange(e)}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed