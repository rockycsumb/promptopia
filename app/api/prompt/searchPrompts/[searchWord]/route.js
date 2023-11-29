import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

// get
export const GET = async (request, {params}) => {
    
    try { 
        await connectToDB();


        const prompts = await Prompt.find({prompt: {$regex: params.searchWord}}).populate("creator").lean()

        console.log("form back ", prompts)
        
        if(!prompts) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompts), {status: 200})

    } catch(error) {
        return new Response("failed to load prompt", {status: 500})

    }
}