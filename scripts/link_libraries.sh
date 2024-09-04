#!/bin/bash

# Define paths
COMPONENTS_PATH="/Users/himanshu.singh/Desktop/matsuda/jsonFormBuilder"
WEBAPP_PATH="/Users/himanshu.singh/Desktop/matsuda/jsonFormBuilder/app"

# Step 1: Link component library globally
cd "$COMPONENTS_PATH"
npm link 

# Step 2: Link React and related libraries from the web application

echo "Linking React" 
cd "$WEBAPP_PATH/node_modules/react"
npm link 

echo "Linking React-DOM"
cd "$WEBAPP_PATH/node_modules/react-dom"
npm link 

# Step 3: Link zustand library from the web application
echo "Linking zustand library"
cd "$WEBAPP_PATH/node_modules/zustand"
npm link 

# Step 3: Link React and related libraries to the component library
echo "Linking React and related libraries to the component library"
cd "$COMPONENTS_PATH"
npm link  react react-dom zustand

# Step 4: Link component library to the web application

echo "Linking component library to the web application"
cd "$WEBAPP_PATH"
npm link  "json-styled-form-builder"

echo "Linking complete!"