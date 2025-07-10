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
            - The JSON must look like:
              { "setup": "...", "installDependencies": "...", "App.jsx": "code_here", ... }
            
            Now respond with JSON **only**, nothing else.
            JSON without backticks or any extra formatting.
    ` ; 
 }