import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

// get
export const GET = async (request, {params}) => {
    
    try { 
        
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompt), {status: 200})

    } catch(error) {
        return new Response("failed to load prompt", {status: 500})

    }
}

//Patch
export const PATCH = async (request, {params}) => {
    const {prompt, tag}  = await request.json();

    try {
        await connectToDB();

        const exisitingPrompt = await Prompt.findById(params.id);

        if(!exisitingPrompt) return new Response("Prompt not found", {status: 404})

        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save();
        return new Response(JSON.stringify(exisitingPrompt), {status: 200})

    } catch (error) {
        return new Response("Failed to update prompt", {status: 500})

    }
}

//delete
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        let response = await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {status: 200})

    } catch (error) { 
        console.log("this is ing working ", params.id)
        return new Response("Failed to delete prompt", {status: 500})  
    }
}