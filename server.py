"""Tiny static server for the site. Only serves public files (never private/ or dotfiles)."""
import http.server
import os

PORT = int(os.environ.get("PORT", 8080))
ALLOWED = ("/", "/index.html", "/styles.css", "/main.js", "/assets/")


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path in ALLOWED[:4] or (path.startswith("/assets/") and ".." not in path):
            return super().do_GET()
        self.send_error(404)

    def list_directory(self, path):
        self.send_error(404)
        return None


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as s:
        print(f"Serving on http://localhost:{PORT}")
        s.serve_forever()
