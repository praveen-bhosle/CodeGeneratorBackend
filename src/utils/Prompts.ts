export function getInitialPrompt( question : string  ) { 
    return `
            question=${question}
            What you have to do: Create a minimal and modern frontend in the current directory using React, JS, Vite, and TailwindCSS, with Yarn. Return **only** a JSON object with:
            
            - setup commands (no prompts during project creation)
            - installation commands
            - Tailwind config updates
            - full App.jsx (or .tsx) 
            - yarn run command
            
            Constraints:
            - Use Yarn only (not npm)
            - No interactive prompts
            - Stack can only change if the question makes it necessary (but stay in JS ecosystem)
            - The JSON **must** look like:
              { "setup": "...", "addDependencies": "...content of package.json here..." ,"installDependencies": "yarn install", "files" : [ { "filepath" :"/src/App.jsx" , "content" : "..."  } ] , "start" : "..."   }
            Now respond with JSON **only**, nothing else.
            JSON without backticks or any extra formatting.
            Dont add any unneccessary cd/rm commands,
            Like for previous few tries u sent "yarn create vite . --template react && rm -rf .git" / "yarn create vite . --template react && cd ." 
            Clearly the cd . and rm -rf .git are unnecessary in this context.
            The package.json should contain all the required libraries and dev libraries.
            Avoid initialising files using init -p command.
            Instead add those files with filepath and content in "files" of json.
            The content of package.json must contain should follow this pattern 
             {
              "name": "xxxxx",
              "private": true,
              "version": "xxx",
              "type": "module",
              "scripts": {
                "dev": "xxx",
                "build": "xxx",
              },
              "dependencies": {
                .....
              },
              "devDependencies": {
                .....
              }
              }     
              Make sure the dependencies contain all the required dependecies like  "@vitejs/plugin-react" with correct version.
              For config.js files use export default syntax in place of module.exports.
              vite.confg.js must contain  "server: {host: true }"
}
              `; 
 }