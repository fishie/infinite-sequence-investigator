# Setup
```
sudo apt install python3 python3-distutils
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
git pull

python3 emsdk install latest
python3 emsdk activate latest
```

# For fish shell:
```
set -l emcc_path (readlink -f fastcomp/emscripten/emcc)
alias emcc "python3 $emcc_path" --save
```

# Build
```
emcc app.c -o app.wasm -Os
```

# Run
```
python3 -m http.server
```

# Troubleshooting
```
Uncaught (in promise) TypeError: Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.
```

Fix:
```
sudo su -c "echo 'application/wasm    wasm' >> /etc/mime.types"
```
