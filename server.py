"""Tiny static server for the site. Only serves public files (never private/ or dotfiles)."""
import http.server
import os
import posixpath
import urllib.parse

PORT = int(os.environ.get("PORT", 8080))
ALLOWED = (
    "/",
    "/index.html",
    "/styles.css",
    "/i18n.js",
    "/main.js",
    "/lab3d.js",
    "/favicon.ico",
    "/favicon.svg",
    "/apple-touch-icon.png",
)


class Handler(http.server.SimpleHTTPRequestHandler):
    def _is_allowed(self):
        raw_path = self.path.split("?", 1)[0]
        if "\x00" in raw_path or "\\" in raw_path:
            return False
        decoded = urllib.parse.unquote(raw_path)
        if "\x00" in decoded or "\\" in decoded:
            return False
        parts = [p for p in decoded.split("/") if p]
        if ".." in parts:
            return False
        norm = posixpath.normpath(decoded)
        if decoded.endswith("/") and norm != "/":
            norm += "/"
        return norm in ALLOWED or (norm.startswith("/assets/") and "/.." not in norm)

    def do_GET(self):
        if self._is_allowed():
            return super().do_GET()
        self.send_error(404)

    def do_HEAD(self):
        if self._is_allowed():
            return super().do_HEAD()
        self.send_error(404)

    def list_directory(self, path):
        self.send_error(404)
        return None


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as s:
        print(f"Serving on http://localhost:{PORT}")
        s.serve_forever()
