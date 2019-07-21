const newBody = document.createElement('body');
newBody.innerHTML = 'hejhej';
document.body = newBody;

WebAssembly.instantiateStreaming(fetch('app.wasm'))
  .then((wasm) => {
    console.log(wasm.instance.exports._foobar());
  });
