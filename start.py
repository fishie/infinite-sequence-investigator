from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import webbrowser
from multiprocessing import Process

PORT = 8000

def start_server():
    with ThreadingHTTPServer(('', PORT), SimpleHTTPRequestHandler) as http_server:
        print('serving at port', PORT)
        http_server.serve_forever()
def open_browser():
    url = f'http://localhost:{PORT}'
    print(f'opening {url} in a web browser...')
    webbrowser.open(url)

Process(target=start_server).start()
Process(target=open_browser).start()
