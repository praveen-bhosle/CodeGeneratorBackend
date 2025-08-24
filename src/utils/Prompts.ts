export const initialPrompt =  
`You have to create a minimal, modern frontend project in the current directory using **React, JavaScript, Vite, and TailwindCSS**, managed with **Yarn**.  
Requirements:
1. Return **only** a JSON object with the following structure:
   {
     "text": "Brief explanation of changes or purpose of the files",
     "files": [
       { "filepath": "/src/App.jsx", "content": "..." },
       ...
     ]
   }
2. Populate all files completely so that the user can run yarn install and yarn dev directly without further modifications.
3. Include all necessary files:
   - package.json (with correct dependencies and devDependencies, including "@vitejs/plugin-react" with proper version)
   - Vite config (vite.config.js) with server: { host: true }
   - Tailwind config
   - Any other required project files
4. package.json format must follow this pattern:
   {
     "name": "project-name",
     "private": true,
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build"
     },
     "dependencies": { ... },
     "devDependencies": { ... }
   }
5. For any configuration files (*.config.js), use **ES module syntax**: export default { ... } instead of module.exports.
6. Do not include unescaped newlines or quotes in the JSON.
7. Return JSON **only**, without backticks, explanations, or extra formatting.
Your goal is to generate a fully functional project in JSON so the user can directly install and run it.
`

export const updatePrompt = `{"text": "You are given an update instruction and the current project files in the format: { \"files\": [ { \"filepath\": \"...\", \"content\": \"...\" } ] }. Based on the instruction, return ONLY the files that need to be updated. Do not return unchanged files. The response must strictly follow this JSON format: { \"text\": \"\", \"files\": [ { \"filepath\": \"...\", \"content\": \"...\" } ] }. Do not include any explanations, backticks, or extra formatting. Always ensure the file content is complete and valid so that the updated project runs correctly after replacing only the returned files."}`

/* 
 Dont add any unneccessary cd/rm commands,
 Like for previous few tries u sent "yarn create vite . --template react && rm -rf .git" / "yarn create vite . --template react && cd ." 
 Clearly the cd . and rm -rf .git are unnecessary in this context.
 Avoid initialising files using init -p command.           
*/ 