---

layout: default
---

# Search

<ul id="search-results"></ul>

<script>
  window.store = {
    {% for p in site.tabs %}
         {% if p.layout == "tab" %}
            "{{ p.url | slugify }}":{"artist": "{{ p.artist | xml_escape }}","title": "{{ p.title | xml_escape }}","url": "{{ p.url | xml_escape }}"}{% unless forloop.last %},{% endunless %}
        {% endif %}
    {% endfor %}
  };
</script>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ site.url }}/assets/js/core.js"></script>
