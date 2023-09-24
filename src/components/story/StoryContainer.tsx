import { useState } from "react"
import { stories } from "../../utils/helpers"
import StoryCard from "./StoryCard"

const StoryContainer = () => {
    const storiesList = stories
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(false)
    const savedStories=['sldfj','sdfjlsdfjsoid','dk397nf9r8w89ruwo9']
    return (
        <div className="">
            <div className="flex justify-center flex-wrap gap-4 ">
                {
                    (!isLoading && storiesList) && storiesList.map(story => <StoryCard savedStories={savedStories} story={story} key={story._id} />)
                }
            </div>
            {
                isLoading && <p>Loading....</p>
            }
        </div>
    )
}

export default StoryContainer