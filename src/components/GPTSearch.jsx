import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utilts/constants'

const GPTSearch = () => {
  return (
    <div>
        <div className="absolute -z-10">
                <img
                    className="h-dvh w-dvw "
                    src= {BG_IMG}
                    alt="background"
                />
            </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GPTSearch