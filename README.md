# Infinite Sequence Investigator

## Setup

You need nodejs >= 12 to run the tests. Install eslint for linting.

```
sudo apt install python3 python3-distutils
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
git pull

python3 emsdk install latest
python3 emsdk activate latest
```

## For fish shell

```
set -l emcc_path (readlink -f fastcomp/emscripten/emcc)
alias emcc "python3 $emcc_path" --save
```

## Build

```
npm run build
```

## Run

```
npm start
```

Under Windows Subsystem for Linux, you might want to set the BROWSER environment
variable to avoid automatically opening a text-based browser. For example:

```
export BROWSER="/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
```

## Test

```
npm test
```

Running npm test requires nodejs >= 12 and Python >= 3.7.

## Troubleshooting

```
Uncaught (in promise) TypeError: Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.
```

Fix:

```
sudo su -c "echo 'application/wasm    wasm' >> /etc/mime.types"
```

## Thanks to

[Open Iconic](https://github.com/iconic/open-iconic)

[vscode](https://github.com/microsoft/vscode)

[Node.js](https://github.com/nodejs)

[npm](https://github.com/npm)

[fish](https://github.com/fish-shell)

[Python](https://github.com/python)

[ESLint](https://github.com/eslint)
