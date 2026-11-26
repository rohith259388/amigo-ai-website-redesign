#!/usr/bin/env python3
"""Import the blog, docs, comparison and pricing pages from the live site.

    python3 -I scripts/import_live_content.py                # download from the live site, then import
    python3 -I scripts/import_live_content.py <saved-dir>    # re-import pages saved earlier

Run it again before launch to pick up pages published since the last import, and ONLY while
www.amigohelp.ai still serves the old site. It rewrites src/content/ and adds missing images
to public/images/. Downloaded pages are treated as untrusted data: only an allow-list of tags
and attributes is kept.
"""
import glob, html, json, os, re, shutil, sys, tempfile, urllib.request
from html.parser import HTMLParser

SITE = "https://www.amigohelp.ai"
PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fetch(path):
    request = urllib.request.Request(SITE + path, headers={"User-Agent": "site-migration-fetch"})
    with urllib.request.urlopen(request, timeout=40) as response:
        return response.read()


def download():
    folder = tempfile.mkdtemp(prefix="amigo-live-")
    sitemap = fetch("/sitemap.xml").decode()
    open(os.path.join(folder, "sitemap.xml"), "w").write(sitemap)
    wanted = re.findall(rf"<loc>{re.escape(SITE)}(/(?:blog|docs|compare|pricing)(?:/[a-z0-9\-/]*)?/)</loc>", sitemap)
    for path in wanted:
        open(os.path.join(folder, path.strip("/").replace("/", "__") + ".html"), "wb").write(fetch(path))
    print("downloaded", len(wanted), "pages to", folder)
    return folder


SRC = sys.argv[1] if len(sys.argv) > 1 else download()
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
DROP = {"svg", "script", "style", "button", "input", "noscript", "nav", "form", "select", "textarea"}
KEEP = {"h2", "h3", "h4", "p", "ul", "ol", "li", "a", "strong", "em", "b", "i", "table", "thead", "tbody", "tr", "th",
        "td", "blockquote", "code", "pre", "kbd", "hr", "br", "img", "figure", "figcaption", "sup", "iframe"}
BLOCK = {"h1", "h2", "h3", "h4", "p", "ul", "ol", "li", "table", "thead", "tbody", "tr", "blockquote", "pre", "hr",
         "figure", "figcaption", "div", "section", "article", "header", "aside", "main", "iframe"}


class Node:
    def __init__(self, tag, attrs=None):
        self.tag, self.attrs, self.kids = tag, dict(attrs or {}), []

    def walk(self):
        yield self
        for k in self.kids:
            if isinstance(k, Node):
                yield from k.walk()

    def find(self, tag, cls=None):
        for n in self.walk():
            if n.tag == tag and (cls is None or cls in (n.attrs.get("class") or "").split()):
                return n

    def all(self, tag):
        return [n for n in self.walk() if n.tag == tag]

    def text_content(self):
        return "".join(k for k in self.kids if isinstance(k, str)).strip()

    def raw(self):
        if self.tag in ("script", "style"):  # the JSON-LD copy of the FAQ is not the accordion
            return ""
        return " ".join(k if isinstance(k, str) else k.raw() for k in self.kids)

    def els(self):
        return [k for k in self.kids if isinstance(k, Node)]

    def text(self):
        out, previous_element = [], False
        for k in self.kids:
            if isinstance(k, str):
                out.append(k)
                previous_element = False
            elif k.tag == "br":
                out.append(" ")
            elif k.tag not in DROP and k.attrs.get("aria-hidden") != "true":
                if previous_element:  # CSS puts adjacent elements on separate lines or spaces them
                    out.append(" ")
                out.append(" " + k.text() + " " if k.tag in BLOCK else k.text())
                previous_element = True
        return re.sub(r"\s+", " ", "".join(out)).strip()


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].kids.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].kids.append(Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].kids.append(data)


esc = lambda s: html.escape(s, quote=False)
attr = lambda s: html.escape(s, quote=True)


def local_url(url):
    """Internal page links get the trailing slash the live site canonicalises to."""
    url = url.replace(SITE, "") or "/"
    if url.startswith("/") and not url.startswith("//"):
        m = re.match(r"^([^?#]*)(.*)$", url)
        path, rest = m.group(1), m.group(2)
        if path and not path.endswith("/") and not re.search(r"\.\w{2,5}$", path):
            path += "/"
        return path + rest
    return url


def safe_href(href):
    if not href:
        return None
    if href.startswith(("#", "mailto:")):
        return href
    if href.startswith(("/", SITE)) and not href.startswith("//"):
        return local_url(href)
    return href if re.match(r"^https?://", href) else None


def has_block(node):
    return any(isinstance(k, Node) and k.tag not in DROP and (k.tag in BLOCK or has_block(k)) for k in node.kids)


SYMBOLS = {"check_circle": "✓", "remove_circle": "—"}


def is_symbol(k):
    return (isinstance(k, Node) and "material-symbols-outlined" in (k.attrs.get("class") or "")
            and k.text_content() in SYMBOLS)


def inline_join(node):
    """Render children, adding the space that CSS gaps provided between adjacent elements."""
    out, previous_element = [], False
    for k in node.kids:
        piece = render(k)
        if not piece:
            continue
        element = isinstance(k, Node)
        if element and previous_element and not out[-1].endswith((" ", ">\n")):
            out.append(" ")
        out.append(piece)
        previous_element = element
    return "".join(out)


def mixed(node):
    """Children of a container: loose inline runs become paragraphs, blocks pass through."""
    out, run, previous_element = [], [], False

    def flush():
        text = "".join(run).strip()
        run.clear()
        if text and re.sub(r"<[^>]+>", "", text).strip() or "<img" in text:
            out.append(f"<p>{text}</p>\n")

    for k in node.kids:
        if isinstance(k, Node) and (k.tag in BLOCK or has_block(k)):
            flush()
            out.append(render(k))
            previous_element = False
        else:
            piece = render(k)
            if piece:
                element = isinstance(k, Node)
                if element and previous_element:
                    run.append(" ")
                run.append(piece)
                previous_element = element
    flush()
    return "".join(out)


def render(n):
    if isinstance(n, str):
        return esc(re.sub(r"\s+", " ", n))
    t, a = n.tag, n.attrs
    if t in DROP or a.get("aria-hidden") == "true":
        return ""
    if t == "br":
        return "<br>"
    if t == "hr":
        return "<hr>\n"
    if t == "img":
        src = a.get("src") or ""
        if not src.startswith(("/images/", "https://images.unsplash.com/")):
            return ""  # logos and mascots are decoration
        dims = "".join(f' {k}="{a[k]}"' for k in ("width", "height") if (a.get(k) or "").isdigit())
        return f'<img src="{attr(src)}" alt="{attr(a.get("alt") or "")}"{dims} loading="lazy" decoding="async">'
    if t == "iframe":
        src = a.get("src") or ""
        if not src.startswith("https://www.youtube-nocookie.com/embed/"):
            return ""
        return (f'<iframe src="{attr(src)}" title="{attr(a.get("title") or "Video")}" loading="lazy" '
                'allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>\n')
    if t == "a":
        href = safe_href(a.get("href"))
        if has_block(n):  # a whole card was one link: keep all its text, then a link under it
            title = next((x.text() for t in ("h2", "h3", "h4", "p") for x in n.all(t) if x.text()), n.text())
            if not href or not title:
                return mixed(n)
            return f'<div class="card">{mixed(n)}<p><a href="{attr(href)}">{esc(title)} →</a></p></div>\n'
        label = inline_join(n).strip()
        if not label:
            return ""
        if not href:
            return label
        ext = ' target="_blank" rel="noopener noreferrer"' if href.startswith("http") else ""
        return f'<a href="{attr(href)}"{ext}>{label}</a>'
    if t in ("table",):
        return f'<div class="table-wrap"><table>{"".join(render(k) for k in n.els())}</table></div>\n'
    if t in ("thead", "tbody", "tr", "ul", "ol"):
        return f"<{t}>{''.join(render(k) for k in n.els())}</{t}>\n"
    if t in ("th", "td", "li"):
        if t in ("th", "td"):  # tick and dash icons carry the meaning of a comparison table
            for x in list(n.walk()):
                x.kids = [SYMBOLS[k.text_content()] + " " if is_symbol(k) else k for k in x.kids]
        inner = (mixed(n) if has_block(n) else inline_join(n)).strip()
        extra = "".join(f' {k}="{a[k]}"' for k in ("colspan", "rowspan") if (a.get(k) or "").isdigit())
        return f"<{t}{extra}>{inner}</{t}>"
    if t in KEEP:
        inner = (mixed(n) if t in ("blockquote", "figure") else inline_join(n)).strip()
        if not inner:
            return ""
        ident = f' id="{attr(a["id"])}"' if t in ("h2", "h3", "h4") and a.get("id") else ""
        return f"<{t}{ident}>{inner}</{t}>" + ("\n" if t in BLOCK else "")
    if t == "h1":
        return ""  # the page template prints the title
    if t in BLOCK:
        return mixed(n)
    return inline_join(n)  # span and other inline wrappers


def remove_faq_block(root, faqs):
    """Cut the on-page FAQ accordion (most answers are not in its HTML); the template reprints it in full."""
    if not faqs:
        return
    questions = [norm(f["q"]) for f in faqs]
    path = [root]
    while True:
        inner = [k for k in path[-1].els() if all(q in norm(k.raw()) for q in questions)]
        if not inner:
            break
        path.append(inner[0])
    if not is_faq_block(path[-1], faqs):
        return
    i = len(path) - 1
    words = lambda n: len(n.raw().split())
    while i > 1 and is_faq_block(path[i - 1], faqs) and words(path[i - 1]) - words(path[i]) <= 25:
        i -= 1
    path[i - 1].kids.remove(path[i])


def head(doc, pattern):
    m = re.search(pattern, doc, re.S)
    return html.unescape(m.group(1)).strip() if m else None


def fix_ld(value):
    if isinstance(value, dict):
        return {k: fix_ld(v) for k, v in value.items() if k not in ("aggregateRating", "review", "reviews")}
    if isinstance(value, list):
        return [fix_ld(v) for v in value]
    if isinstance(value, str) and value.startswith(SITE):
        value = value.replace("/favicon-v2.png", "/favicon.png")
        return SITE + local_url(value)
    return value


def faqs_from(blocks):
    found = []

    def visit(v):
        if isinstance(v, dict):
            if v.get("@type") == "Question":
                found.append({"q": v.get("name", ""), "a": (v.get("acceptedAnswer") or {}).get("text", "")})
            for x in v.values():
                visit(x)
        elif isinstance(v, list):
            for x in v:
                visit(x)

    visit(blocks)
    return found


norm = lambda s: re.sub(r"\W+", "", html.unescape(re.sub(r"<[^>]+>", "", s))).lower()


def head(doc, pattern):
    m = re.search(pattern, doc, re.S)
    return html.unescape(m.group(1)).strip() if m else None


def fix_ld(value):
    if isinstance(value, dict):
        return {k: fix_ld(v) for k, v in value.items() if k not in ("aggregateRating", "review", "reviews")}
    if isinstance(value, list):
        return [fix_ld(v) for v in value]
    if isinstance(value, str) and value.startswith(SITE):
        value = value.replace("/favicon-v2.png", "/favicon.png")
        return SITE + local_url(value)
    return value


def faqs_from(blocks):
    found = []

    def visit(v):
        if isinstance(v, dict):
            if v.get("@type") == "Question":
                found.append({"q": v.get("name", ""), "a": (v.get("acceptedAnswer") or {}).get("text", "")})
            for x in v.values():
                visit(x)
        elif isinstance(v, list):
            for x in v:
                visit(x)

    visit(blocks)
    return found


norm = lambda s: re.sub(r"\W+", "", html.unescape(re.sub(r"<[^>]+>", "", s))).lower()


def is_faq_block(node, faqs):
    if not faqs:
        return False
    text = node.raw()
    plain = norm(text)
    hits = sum(norm(f["q"]) in plain for f in faqs)
    qa_words = sum(len((f["q"] + " " + f["a"]).split()) for f in faqs)
    return hits >= min(2, len(faqs)) and len(text.split()) < qa_words * 1.3 + 60
sitemap = open(os.path.join(SRC, "sitemap.xml")).read()
lastmods = {u.rstrip("/"): d for u, d in re.findall(r"<loc>(.*?)</loc>\s*<lastmod>(.*?)</lastmod>", sitemap)}

pages, docs_nav, problems = [], None, []
for file in sorted(glob.glob(os.path.join(SRC, "*.html"))):
    name = os.path.basename(file)[:-5]
    path = "/" + name.replace("__", "/")
    section = name.split("__")[0]
    doc = open(file, encoding="utf-8").read()
    tree = Tree()
    tree.feed(doc)
    root = tree.root
    blocks = [json.loads(b) for b in re.findall(r"<script[^>]*application/ld\+json[^>]*>(.*?)</script>", doc, re.S)]
    blocks = [fix_ld(b) for b in blocks if not (isinstance(b, dict) and b.get("@type") in ("Organization", "WebSite"))]
    image = head(doc, r'<meta property="og:image" content="([^"]+)"')
    page = {
        "path": path,
        "section": section,
        "title": head(doc, r"<title>(.*?)</title>"),
        "description": head(doc, r'<meta name="description" content="([^"]*)"'),
        "ogType": head(doc, r'<meta property="og:type" content="([^"]+)"') or "website",
        "image": None if not image or "og-image" in image else image,
        "jsonLd": blocks,
        "lastmod": lastmods.get(SITE + path),
    }
    h1 = root.find("h1")
    page["h1"] = h1.text() if h1 else page["title"].split(" | ")[0]
    main = root.find("main")
    related = []
    faqs = faqs_from(blocks)
    remove_faq_block(root, faqs)

    if section == "blog" and name != "blog":
        article = root.find("article", "blog-prose")
        header = main.find("header")
        chrome = ("Found this useful?", "Related reading")
        body = "".join(render(k) for k in article.kids
                       if not (isinstance(k, Node) and (k.text().startswith(chrome))))
        lead = header.find("p")
        page["lead"] = lead.text() if lead else ""
        meta_text = main.text().split(page["h1"])[0].replace("Back to blog", "").strip()
        m = re.match(r"^(.*?)\s*·\s*(\d+ min read)", meta_text)
        if m:
            page["category"], page["readTime"] = m.group(1), m.group(2)
        d = re.search(r"\d{1,2} [A-Z][a-z]+ 20\d\d", header.text())
        page["date"] = d.group(0) if d else None
        byline = [x.text() for x in header.all("p")]
        i = byline.index(page["date"]) if page["date"] in byline else 0
        page["author"] = byline[i - 1] if i > 1 else "Amigo Team"
        hero = next((i for i in main.all("img") if (i.attrs.get("src") or "").startswith(("/images/", "https://images."))), None)
        if hero:
            page["hero"] = {"src": hero.attrs["src"], "alt": hero.attrs.get("alt") or ""}
        for link in article.all("a"):
            href = link.attrs.get("href") or ""
            if re.match(r"^/blog/[\w-]+/?$", href) and link.find("img"):
                related.append(href.rstrip("/"))
    elif section == "docs":
        article = root.find("article", "docs-page")
        if article is None:
            article = main
        if article.els() and article.els()[0].tag == "div":  # category badge
            badge = article.els()[0]
            if badge.find("h1") is None and len(badge.text()) < 60:
                page["category"] = badge.text()
                article.kids.remove(badge)
        body = mixed(article)
        aside = root.find("aside")
        if aside and docs_nav is None:
            docs_nav = []
            for group in aside.find("nav").els():
                title = group.find("button").text()
                items = []
                for link in group.all("a"):
                    label = link.find("span").text()
                    items.append({"path": link.attrs["href"].rstrip("/"), "label": label})
                docs_nav.append({"title": title, "items": items})
    elif name == "blog":
        body = ""  # listed from the manifest
        page["lead"] = page["description"]
    elif section == "compare":
        top = []

        def top_sections(n):
            for k in n.els():
                if k.tag in ("header", "footer", "nav"):
                    continue
                if k.tag == "section" and any(c.tag == "section" for c in k.walk() if c is not k):
                    top_sections(k)
                elif k.tag == "section":
                    top.append(k)
                else:
                    top_sections(k)

        top_sections(root)
        rendered = [mixed(s) for s in top]
        body = "".join(f"<section>{r}</section>\n" for r in rendered if r.strip())
    else:  # pricing
        body = mixed(main)
        body = re.sub(rf"^(<p>(?:{re.escape(page['h1'])}|Pricing)</p>\n)+", "", body.strip())

    body = re.sub(r"\n{2,}", "\n", body).strip()
    page["html"] = body
    # Structured data may only describe visible text: print any FAQ the body does not already show.
    missing = [f for f in faqs if norm(f["a"]) not in norm(body)]
    if missing:
        questions = {norm(f["q"]) for f in missing}
        body = re.sub(r"<(p|h3|h4)(?: [^>]*)?>((?:(?!</\1>).)*)</\1>\n?",
                      lambda m: "" if norm(m.group(2)) in questions else m.group(0), body, flags=re.S)
        body = re.sub(r"<h2[^>]*>(?:Frequently Asked Questions|Common Questions|FAQs?)</h2>\n?$", "", body.strip())
        page["html"], page["faqs"] = body, missing
    if related:
        page["related"] = list(dict.fromkeys(related))
    pages.append(page)
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    words += sum(len(f["a"].split()) for f in page.get("faqs", []))
    if name != "blog" and words < 150:
        problems.append((path, "thin", words))
    for bad in ("Share on X", "Related reading", "<script", "class=\"hidden", "onclick="):
        if bad in body:
            problems.append((path, "contains", bad))

out = os.path.join(PROJECT, "src/content")
shutil.rmtree(os.path.join(out, "pages"), ignore_errors=True)
os.makedirs(os.path.join(out, "pages"), exist_ok=True)
for page in pages:
    fname = page["path"].strip("/").replace("/", "__") + ".json"
    with open(os.path.join(out, "pages", fname), "w") as f:
        json.dump(page, f, ensure_ascii=False, indent=1)
        f.write("\n")
keys = ("path", "section", "h1", "description", "lastmod", "category", "readTime", "date", "hero")
manifest = [{k: p[k] for k in keys if p.get(k)} for p in pages]
json.dump(manifest, open(os.path.join(out, "manifest.json"), "w"), ensure_ascii=False, indent=1)
json.dump(docs_nav, open(os.path.join(out, "docs-nav.json"), "w"), ensure_ascii=False, indent=1)

images = set(re.findall(r"/images/[\w\-/]+\.(?:jpg|jpeg|png|webp)", json.dumps(pages)))
added = 0
for image in sorted(images):
    target = os.path.join(PROJECT, "public" + image)
    if not os.path.exists(target):
        data = fetch(image)
        if not data.startswith((b"\xff\xd8\xff", b"\x89PNG", b"RIFF")):
            problems.append((image, "not an image"))
            continue
        os.makedirs(os.path.dirname(target), exist_ok=True)
        open(target, "wb").write(data)
        added += 1
print("imported", len(pages), "pages |", len(images), "images,", added, "new | check:", problems or "nothing")
