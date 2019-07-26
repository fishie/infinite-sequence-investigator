from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
from multiprocessing import Process

PORT = 8000

def start_server():
    with HTTPServer(('', PORT), SimpleHTTPRequestHandler) as httpd:
        print('serving at port', PORT)
        httpd.serve_forever()
def open_browser():
    url = f'http://localhost:{PORT}'
    print(f'opening {url} in a web browser...')
    webbrowser.open(url)

Process(target=start_server).start()
Process(target=open_browser).start()
