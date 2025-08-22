#!/bin/bash

echo "🚀 Starting POS Application Setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if Angular CLI is installed
if ! command -v ng &> /dev/null; then
    echo "🔧 Installing Angular CLI..."
    sudo npm install -g @angular/cli
fi

# Navigate to project directory
cd "$(dirname "$0")"

echo "📋 Installing project dependencies..."
npm install

echo "🏗️ Building the application..."
ng build

echo "🔄 Checking for existing processes on ports..."
# Kill processes on port 3001
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
# Kill processes on port 4200
lsof -ti:4200 | xargs kill -9 2>/dev/null || true

echo "🖥️ Starting local file server..."
node local-server.js &
SERVER_PID=$!

echo "🌐 Starting Angular development server..."
ng serve --port 4200 --host 0.0.0.0 &
ANGULAR_PID=$!

echo "✅ Setup complete!"
echo "🌍 Application running at: http://localhost:4200"
echo "📁 File server running at: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "echo '🛑 Stopping servers...'; kill $SERVER_PID $ANGULAR_PID; exit" INT
wait